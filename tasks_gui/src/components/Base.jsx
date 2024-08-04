import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import "./Base.css"

function Base() {
    return (
    <div>
        <Navbar expand="lg" className="bg-body-tertiary transparent-navbar">
            <Container>
                <Navbar.Brand href="#home">Tusks</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Old Tasks</Nav.Link>
                    <Nav.Link href="#link">Statistics</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
    </div>
  );
}

export default Base;