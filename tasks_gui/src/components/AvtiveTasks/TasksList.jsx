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

import './TaskList.css'


function TasksList(props) {

    const [show, setShow] = useState(false);
    const [inputText, setInputText] = useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


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
                        
                        <div>
                            <X 
                                size={28}
                                onClick={() => {props.deleteData(item)}}
                            />
                            <Check 
                                size={28}
                                onClick={() => {props.completeTask(item.id)}}
                            />
                            <br />
                            <Badge bg="secondary">{new Date(item.date).toLocaleString()}</Badge>
                        </div>
                    </Card.Body>
                </Card>
            ))}
            
        </div>
        </>
    )
}

export default TasksList