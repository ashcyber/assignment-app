import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const Navigation = () => (
    <header>
        <Navbar bg="primary" variant="dark">
            <Container>
                <LinkContainer exact={true} to="/">
                    <Navbar.Brand>MainApp</Navbar.Brand>
                </LinkContainer>
                <Nav className="mr-auto">
                    <LinkContainer exact={true} to="/">
                        <Nav.Link >Dashboard</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/reports">
                        <Nav.Link>Reports</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Container>

        </Navbar>
    </header>
);

export default Navigation; 
