import React, {Component} from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

export default class Header extends Component{
    state = {
        token: ""
    }

    isLogin = () =>{
        const token = localStorage.getItem('token-do-usuario');
        if(token === "")
                return(
                    <Nav className="mr-auto">
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/registrar">Cadastrar</Nav.Link>
                    </Nav>
                );
        else
                return(
                    <Nav className="mr-auto">
                        <Nav.Link href="">Nome do usuario</Nav.Link>
                        <button onClick={this.sair}>sair</button>
                    </Nav>
                );
    }

    sair = () => {
        localStorage.setItem('token-do-usuario', "");
    }

    

    render(){
        return(
            <header className= "cabecalho">
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Logomarca X</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {this.isLogin()}
                <Form inline>
                    <FormControl type="text" placeholder="Pesquisar" className="mr-sm-2" />
                    <Button variant="outline-info">Pesquisar</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    </header>
        );
    }
}

/*const Header = () => (
    <header className= "cabecalho">
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Logomarca X</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
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
*/