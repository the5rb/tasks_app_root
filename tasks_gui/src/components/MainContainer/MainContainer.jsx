import React, { useState, useEffect } from "react";

import TasksList from "../AvtiveTasks/TasksList";
import CompletedTasks from "../CompletedTasks/CompletedTasks"
import './MainContainer.css'

import axios from "axios";
import { Tabs, Tab, Button } from "react-bootstrap";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import { LuArrowLeftFromLine, LuArrowRightFromLine } from "react-icons/lu";
import { BsArrowsExpandVertical, BsArrowsCollapseVertical } from 'react-icons/bs';
import { IconContext } from "react-icons";


function MainContainer() {
    // Declaring state variables
    const [activeTasks, setActiveTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [tabs, setTabs] = useState([])
    const [activeKey, setActiveKey] = useState(null);
    const [editingTabId, setEditingTabId] = useState(null);
    const [editedTabName, setEditedTabName] = useState('');
    const [completedVisible, setCompletedVisible] = useState(false)

    const apiUrl = import.meta.env.VITE_TASKS_API
    
    const getData = () => { 
        axios.get(apiUrl) //list tasks endpoint is at the base api so we call apiUrl directly
        .then((response) => {
            let at = []
            let ct = []
            // Separating active from completed tasks
            response.data.forEach((task) => {
                if (task.status === true) {
                    at.push(task)
                } else {
                    ct.push(task)
                }
            })
            setActiveTasks(at)
            setCompletedTasks(ct)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    // Call create new task endpoint
    const newTask = (input) => {
        const createPath = '/tasks/create/'
        const url = `${apiUrl}${createPath}`
        const tabPk = getTabPkByTabId(activeKey)
        const postData = {
            'task': input,
            'status': true,
            "tab": tabPk
        }
        
        axios.post(url, postData, 'application/json')
        .then((response) => {
            if (response) {
                console.log('Sucessfully added new task')
                getData()
            }
        }).catch((error) => {
            console.log('There was an error adding a new task', error)
        })
    }

    // Getting current tab pk helper function
    const getTabPkByTabId = (tabId) => {
        const tab = tabs.find(t => t.tab_id === tabId);
        return tab ? tab.id : null;
    };

    // Call completed task endpoint
    const completeTask = (id) => {
        const completedPath = `/tasks/${id}/update-status/`
        const url = `${apiUrl}${completedPath}`
        const data = {
            'status': 'False'
        }
        axios.patch(url, data, "application/json")
        .then((response) => {
            if (response) {
                console.log('Completed the task')
                getData()
            }
        })
    }

    // Call update status endpoint - updating status moves the task from complete to active (replay task)
    const replayTask = (id) => {
        const replayPath = `/tasks/${id}/update-status/`
        const url = `${apiUrl}${replayPath}`
        const data = {
            'status': 'True'
        }
        axios.patch(url, data, "application/json")
        .then((response) => {
            if (response) {
                console.log('Restored the task')
                getData()
            }
        })
    }

    // Call edit task endpoint
    const editTask = (input, id) => {
        const editTaskUrl = '/tasks/edit-task/'
        const url = `${apiUrl}${editTaskUrl}${id}/`
        
        axios.patch(url, { task: input })
        .then((response) => {
            if(response) {
                console.log('Task updated')
                getData()
            }
        })
    }

    // Call remove task endpoint
    const removeTask = (item) => {
        const deletePath = `/tasks/delete/${item.id}/`
        const url = `${apiUrl}${deletePath}`
        try {
            axios.delete(url, item.id, "application/json")
            .then((response) => {
                if (response) {
                    console.log('Task removed')
                    getData()
                }
            })
        } catch(err) {
            console.log('Could not delete item', err)
        }
    }

// Tabs

    // Call get tabs endpoint
    const getTabs = async () => {
        const tabListUrl = '/tab/list'
        const url = `${apiUrl}${tabListUrl}`
        await axios.get(url)
        .then((response) => {
            setTabs(response.data)
        })
    }

    useEffect(() => {
        getTabs();
      }, []);

    // Call create tab endpoint
    const createTab = () => {
        const tabCreateUrl = '/tab/create/'
        const url = `${apiUrl}${tabCreateUrl}`
        const data = {}
        axios.post(url, data)
        .then((response) => {
            setTabs([...tabs, response.data])
            setActiveKey(response.data.tab_id)
        })
    } 

    // Call rename tab endpoint
    const renameTabs = (input) => {
        const tabUpdateUrl = '/tab/update/'
        const tabId = getTabPkByTabId(activeKey)
        const url = `${apiUrl}${tabUpdateUrl}${tabId}`
        axios.patch(url, { tab_name: input })
        .then((response) => {
            console.log('Updated tab name to', response.data)
            getTabs()
        })
    }

    // Grouping the tasks per tab
    const groupedTasks = tabs.reduce((acc, tab) => {
        acc[tab.tab_id] = {
            tab,
            tasks: activeTasks.filter((task) => task.tab.tab_id === tab.tab_id),
        };
        return acc;
    }, {});

    const deleteTab = () => {        
        // Removing all tasks associated with this tab
        const tasksInTab = groupedTasks[activeKey]?.tasks
        if (tasksInTab > 0) {
            tasksInTab.forEach((item) => {
                removeTask(item.id)
            })
        }
        
        // Remove tab
        const activeTabId = getTabPkByTabId(activeKey)
        const tabDeleteUrl = '/tab/delete/'
        const url = `${apiUrl}${tabDeleteUrl}${activeTabId}`
        axios.delete(url, activeTabId)
        
        .then((response) => {
            console.log('Response:', response)
            if (response) {
                console.log('Tab removed')
                getData()
                getTabs()
            }
        })
    }

    useEffect(() => {
        if (!activeKey && activeTasks.length > 0) {
            setActiveKey(activeTasks[0].tab.tab_id);
        }
    }, [activeTasks, activeKey]);      

    // Renaming tab helper functions
    const handleTabDoubleClick = (tabId, tabName) => {
        setEditingTabId(tabId);
        setEditedTabName(tabName);
    };
    
    const handleTabNameChange = (e) => {
        setEditedTabName(e.target.value);
    };
    
    const handleTabNameSubmit = (tabId) => {
        renameTabs(editedTabName);
        setEditingTabId(null);
    };

    // Toggle active/complete tasks card
    const toggleTasksVisibility = () => {
        setCompletedVisible(!completedVisible);
      };

    return (
        <div className="tasks-section">
    
            <div 
                className="completed-section"
                style={{
                    width: completedVisible ? '100%' : '0',
                    overflow: 'hidden',
                    padding: completedVisible ? '10px' : '0',
                    border: completedVisible ? 'solid 1px' : '0',
                    transition: 'width 0.3s ease',
                    cursor: "pointer",
                    
                  }}
                title="Toggle Active Tasks"
            >
                <IconContext.Provider value={{ size: "1.5rem", className: "global-name" }}>
                    <div onClick={toggleTasksVisibility} style={{display: 'flex', justifyContent: 'end', marginBottom: '10px' }}>
                        <h5 style={{ marginRight: '14px'}}>Completed Tasks</h5>
                        <LuArrowRightFromLine />
                    </div>
                </IconContext.Provider>
                <CompletedTasks
                    responseData={completedTasks}
                    restoreTask={replayTask} 
                />
            </div>
           
            <div 
                className="newtask-section" 
                style={{
                    width: completedVisible ? '0' : '100%',
                    overflow: 'hidden',
                    padding: completedVisible ? '0' : '10px',
                    border: completedVisible ? '0' : 'solid 1px',
                    transition: 'width 0.3s ease',
                    marginBottom: '10px',
                    cursor: "pointer"
                  }}
                title="Toggle Completed Tasks"
            >
            <IconContext.Provider value={{ size: "1.5rem", className: "global-class-name" }}>
            <div onClick={toggleTasksVisibility} style={{ display: 'flex', marginBottom: '10px' }}>
                <LuArrowLeftFromLine /> 
                <h5 style={{ marginLeft: '10px' }}>Active Tasks</h5>
            </div>
            </IconContext.Provider>
            <Tabs
                activeKey={activeKey}
                onSelect={(k) => {
                  if (k === 'add-tab') {
                    createTab();
                  } else {
                    setActiveKey(k);
                  }
                }}
                id="task-tabs"
                className="mb-3"
              >
                {Object.keys(groupedTasks).map((tabId) => {
                const tab = groupedTasks[tabId].tab;
                const tasks = groupedTasks[tabId].tasks;
                return (
                    <Tab 
                        eventKey={tabId} 
                        title={
                            editingTabId === tabId ? (
                                <input
                                    type="text"
                                    value={editedTabName}
                                    onChange={handleTabNameChange}
                                    onBlur={() => handleTabNameSubmit(tabId)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleTabNameSubmit(tabId);
                                        }
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <span onDoubleClick={() => handleTabDoubleClick(tabId, tab.tab_name)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    {tab.tab_name}
                                    <div 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteTab()
                                        }} 
                                        style={{ cursor: 'pointer'}}>
                                        <IoIosClose size={25} />
                                    </div>
                                </span>
                            )
                        }
                        key={tabId}>
                    <TasksList
                        responseData={tasks}
                        completeTask={completeTask}
                        submitData={newTask}
                        deleteData={removeTask}
                        editTask={editTask}
                    />
                    </Tab>
                    );
                    })}
                    <Tab eventKey="add-tab" title={<IoIosAdd size={25} color="black"/>} />
            </Tabs>
            </div>
        </div>
        
    )
}


export default MainContainer