import React from "react";
import { Card, Badge } from "react-bootstrap";
import './Completed.css'

import { ArrowCounterclockwise } from 'react-bootstrap-icons'

function CompletedTasks(props) {
    return (
        <div className="card-holder-complete">
            {props.responseData.slice().reverse().map((item, index) => (
                <Card className="complete-card">
                    <Card.Body className="complete-card-body">
                        {item.task}
                            <ArrowCounterclockwise 
                                size={24}
                                onClick={() => {props.restoreTask(item.id)}}
                            />
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}

export default CompletedTasks