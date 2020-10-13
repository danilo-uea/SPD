import React, {Component} from "react";
import api from "../../services/api";
import { Form, Row, Col, Button } from 'react-bootstrap';


export default class CreateChat extends Component{
    state = {
        titulo: "",
        token: localStorage.getItem('token-do-usuario')
    }

    handleSingUp = async e => {
        e.preventDefault();
        const {titulo, token} = this.state;
        const header={"authorization": "bearer " + token}
        if(!titulo){
            this.setState({error: "preencha todos os campos"});
            alert("Por favor, insira o titulo do chat");
        }
        else{
            try{
                await api.post("/chats",{titulo}, {headers: header});
            }catch(err){
                console.log(err);
                this.setState({error: "erro ao efetuar o registro"});
                } 
            }
        }


    render(){
        return(
            <div className="chat-criar">
                <Form onSubmit={this.handleSingUp}>
                    {this.state.error && <p>{this.state.error}</p>}

                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                titulo
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Titulo" 
                                    onChange={e => this.setState({titulo: e.target.value})} 
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button type="submit">Criar chat</Button>
                            </Col>
                        </Form.Group>
                </Form>
            </div>
        )
    }
}