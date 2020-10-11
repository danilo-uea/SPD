import React, {Component} from "react";
import api from "../../services/api";
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';

export default class CreateQuestion extends Component{

    state = {
        titulo: "",
        categoria: "",
        texto: "",
        token: localStorage.getItem('token-do-usuario')
    };

    handleSingUp = async e => {
        e.preventDefault();
        const {titulo, categoria, texto, token} = this.state;
        const header={"authorization": "bearer " + token}
        if(!titulo || !categoria || !texto){
            this.setState({error: "Preencha todos os campos"});
        }
        else {
            try {
                await api.post("/perguntas",{titulo, categoria, texto, "usuario": token}, {headers: header});
                window.location.href = '/'
            }catch(err){
                console.log(err);
                this.setState({error: "erro ao efetuar o registro"});
                } 
            }
        }

    render(){
        if(this.state.token === "")
            return(
                <Alert variant="success">
                    <Alert.Heading>Por favor, faça o login.</Alert.Heading>
                </Alert>
            );
        else
        return(
            <Form onSubmit={this.handleSingUp}>
                {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}

                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Título
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            type="text" 
                            placeholder="Titulo" 
                            onChange={e => this.setState({titulo: e.target.value})} 
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Categoria
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            type="text" 
                            placeholder="Categoria" 
                            onChange={e => this.setState({categoria: e.target.value})}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Texto
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            as="textarea" 
                            rows="4"
                            placeholder="Especifique aqui a sua duvida" 
                            onChange={e => this.setState({texto: e.target.value})}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit">Cadastrar Pergunta</Button>
                    </Col>
                </Form.Group>
            </Form>
        )
    }
};
