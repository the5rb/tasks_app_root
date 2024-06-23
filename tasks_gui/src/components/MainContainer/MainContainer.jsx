import React, { useState, useEffect } from "react";

import TasksList from "../AvtiveTasks/TasksList";
import CompletedTasks from "../CompletedTasks/CompletedTasks"
import './MainContainer.css'

import axios from "axios";

function MainContainer() {

    const [activeTasks, setActiveTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])

    const getData = () => {
        const url = "http://localhost:8000/api/"
        axios.get(url)
        .then((response) => {
            let at = []
            let ct = []
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

    const handleSubmit = (input) => {
        const url = 'http://localhost:8000/api/tasks/create/'
        const postData = {
            'task': input,
            'status': 'True'
        }
        console.log('This is input: ', input)
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

    const handleCompleted = (id) => {
        const url = `http://localhost:8000/api/tasks/${id}/update-status/`
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

    const handleReplayTask = (id) => {
        const url = `http://localhost:8000/api/tasks/${id}/update-status/`
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

    const handleRemove = (item) => {
        const url = `http://localhost:8000/api/tasks/delete/${item.id}/`
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

    return (
        <div className="tasks-section">
            <div className="completed-section">
                <CompletedTasks 
                    responseData = {completedTasks}
                    restoreTask = {handleReplayTask}
                />
            </div>
            <div className="newtask-section">
                <TasksList 
                    responseData = {activeTasks}
                    completeTask = {handleCompleted}
                    submitData = {handleSubmit}
                    deleteData = {handleRemove}
                />
            </div>
        </div>
    )
}


export default MainContainer