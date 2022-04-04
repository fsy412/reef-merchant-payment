
import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import "./PageHead.css"
import {initWallet} from  "../../services/wallet"

const connectToWallet = async () => {
    console.log('connectToWallet')
    initWallet()
}

const disconnectWallet=()=>{
 
}

const PageHead = () => (
    <Navbar bg="light" expand="lg">
        <img className="logo" src="https://miro.medium.com/fit/c/176/176/1*LRJ2wZUqNQHTOm1KkRlmUA.jpeg" alt="logo" />
        <Navbar.Brand className="headerText" href="#home">Bridge</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">  </Nav>
            <Nav>
                <Nav.Link className="wallet" href="#" onClick={() => connectToWallet()}>Connect to Wallet</Nav.Link>
            </Nav>

            <Nav>
                <Nav.Link className="disconnect" href="#" onClick={() => disconnectWallet()}>Disconnect</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)

export default PageHead;