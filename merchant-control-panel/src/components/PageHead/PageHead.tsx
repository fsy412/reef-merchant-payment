
import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import "./PageHead.css"
const PageHead = () => (
    <Navbar bg="light" expand="lg">
        <img className="logo" src="https://miro.medium.com/fit/c/176/176/1*LRJ2wZUqNQHTOm1KkRlmUA.jpeg" alt="logo" />
        <Navbar.Brand className="headerText" href="#home">Bridge</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">  </Nav>
            <Nav>
                <Nav.Link className="wallet" href="#">Connect to Wallet</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)

export default PageHead;