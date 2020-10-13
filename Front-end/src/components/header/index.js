import React, {Component} from 'react';
import { Navbar, Nav, Form, Container, Button} from 'react-bootstrap';
import './styles.css';

export default class Header extends Component{
    isLogin = () => {
        const token = localStorage.getItem('token-do-usuario');

        if(token === "") {
            return(
                <Form inline>
                    <Nav className="mr-auto">
                        <Nav.Link href="/registrar">Cadastrar</Nav.Link>
                        <Button onClick={this.fazerLogin} variant="outline-primary">Login</Button>
                    </Nav>
                </Form>
            );
        } else {
            const login = localStorage.getItem('login-do-usuario');
            return(
                <Form inline>
                    <Nav className="mr-auto">
                        <Nav.Link href="/"><b>{login}</b></Nav.Link>
                        <Button onClick={this.sair} variant="outline-primary">Sair</Button>
                    </Nav>
                </Form>
            );
        }
    }

    sair = () => {
        localStorage.setItem('token-do-usuario', "");
        localStorage.setItem('login-do-usuario', "");
        window.location.href = '/';
    }

    fazerLogin = () => {
        window.location.href = '/login'
    }

    tratamentoLogo = () => {
        var verificar = window.location.pathname.toString().indexOf('pergunta');

        if (verificar === 1) {
            return (
                null
            );
        } else {
            return (
                <Navbar.Brand id="banner" href="/">
                    <img
                        alt=""
                        src="logo192.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
            );
        }
    }
 
    render(){
        return(
                <Navbar stick="top" bg="dark" variant="dark" expand="lg">
                    <Container>
                        {this.tratamentoLogo()}
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/enviarPergunta">Enviar pergunta</Nav.Link>
                                <Nav.Link href="/chat">Chat</Nav.Link>
                            </Nav>
                            {this.isLogin()}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        );
    }
}