import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios'

import { Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import { Check, X } from 'react-bootstrap-icons'
import { IoMdCreate } from "react-icons/io";

import './TaskList.css'


function TasksList(props) {
    // Declaring state variables
    const [show, setShow] = useState(false);
    const [editShow, setEditShow] = useState(false)
    const [inputText, setInputText] = useState('')
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    
    // Close and Open new and edit task helper function #TODO: Clean this up a bit
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleEditClose = () => setEditShow(false)
    
    // Edit modal show
    const handleEditShow = (task) => {
        setSelectedTaskId(task.id)
        setInputText(task.task)
        setEditShow(true)
    }
    // Submit on entery
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            props.submitData(inputText);
            handleClose();
        }
    }
    // Submit on entery
    const onEditKeyDown = (e) => {
        if (e.key === 'Enter') {
            props.editTask(inputText, selectedTaskId);
            handleEditClose();
        }
    }
    // Submit edit task
    const handleSubmitEdit = () => {
        props.editTask(inputText, selectedTaskId)
        handleEditClose()
    }

    return(
        <>
        <div className='add-task'>
            <Button 
                className='add-button'
                onClick={handleShow}
            >
                +
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                    <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onChange={(e) => {
                            setInputText(e.target.value)
                        }}
                        onKeyDown={handleKeyDown}
                    />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" 
                        onClick={
                            () => {
                                props.submitData(inputText)
                                handleClose()
                            }
                            }>
                    Submit
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
        <div className='card-holder'>
            {props.responseData.slice().reverse().map((item, index) => (
                <Card>
                    <Card.Body>
                        {item.task}
                        
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <X 
                                size={28}
                                onClick={() => {props.deleteData(item)}}
                            />
                            <Check 
                                size={28}
                                onClick={() => {props.completeTask(item.id)}}
                            />
                            <div 
                                style={{ cursor: 'pointer'}}
                                onClick={(e) => {
                                e.stopPropagation();
                                handleEditShow(item)
                            }}>
                                <IoMdCreate />
                            </div>
                            <Modal show={editShow} onHide={handleEditClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Edit Task</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <InputGroup className="mb-3">
                                <Form.Control
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={inputText}
                                    onChange={(e) => {
                                        setInputText(e.target.value)
                                    }}
                                    onKeyDown={onEditKeyDown}
                                />
                                </InputGroup>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleEditClose}>
                                Close
                            </Button>
                            <Button variant="primary" 
                                    onClick={handleSubmitEdit}>
                                Submit
                            </Button>
                            </Modal.Footer>
                        </Modal>
                            
                            <Badge bg="secondary" className='ml-3'>{new Date(item.date).toLocaleString()}</Badge>
                        </div>
                    </Card.Body>
                </Card>
            ))}
            
        </div>
        </>
    )
}

export default TasksList