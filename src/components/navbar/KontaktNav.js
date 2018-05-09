import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from 'react-bootstrap';

const KontaktNav = () => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to="/">Kontakt</Link>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <Navbar.Text>
                <Link to="/kontakts/new"><Button bsStyle="primary" bsSize="xsmall">+</Button></Link>
            </Navbar.Text>
        </Nav>
    </Navbar>
)

export default KontaktNav;
