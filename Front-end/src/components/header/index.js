import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

const Header = () => (
    <header className= "cabecalho">
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Logomarca X</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/registrar">Cadastrar</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Pesquisar" className="mr-sm-2" />
                    <Button variant="outline-info">Pesquisar</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    </header>
);

export default Header;
