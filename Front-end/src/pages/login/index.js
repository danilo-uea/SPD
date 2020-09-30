import React, {Component} from "react";
import api from "../../services/api";
import { Form, Row, Col, Button } from 'react-bootstrap';

export default class Login extends Component{

    state = {
        login: "",
        senha: "",
        error: ""
    };

    handleSingUp = async e => {
        e.preventDefault();
        const {login, senha} = this.state;

        if(!login || !senha){
            this.setState({error: "preencha todos os campos"});
        }
        else{
            try{
                const response = await api.get("/usuarios/" + login + "/" + senha);
                //this.props.history.push("/");
                console.log(response.data);
            }catch(err){
                console.log(err);
                this.setState({error: "erro ao prucurar o registro"});
                } 
            }
        }

    render(){
        return(
            <Form onSubmit={this.handleSingUp}>
                {this.state.error && <p>{this.state.error}</p>}
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Login
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            type="text" 
                            placeholder="Login" 
                            onChange={e => this.setState({login: e.target.value})} 
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Senha
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            type="password" 
                            placeholder="Senha" 
                            onChange={e => this.setState({senha: e.target.value})}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit">Efetuar Login</Button>
                    </Col>
                </Form.Group>
            </Form>
        )
    }
};
