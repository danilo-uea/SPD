import React, {Component} from 'react';
import api from '../../services/api';
import { Form, InputGroup, FormControl, Button, Card, ListGroup } from 'react-bootstrap';
import './styles.css'

export default class Question extends Component{

    state = {
        question: {},
        responses: [],
        respostasInfo: {},
        perg_login: '',
        page: 1
    }
    
    async componentDidMount(page = 1){
        const {id} = this.props.match.params;
        
        const perguntas = await api.get(`/perguntas/${id}`);
        const responstas = await api.get(`/respostas/${id}?page=${page}`);
        const usu = await api.get(`/usuarios/${perguntas.data.idUsuario}`);
        
        const { docs, ...respostasInfo } = responstas.data;
        const { data } = perguntas;
        const { login } = usu.data;
        
        this.setState({question: data, responses: docs, respostasInfo, perg_login: login, page});
    }

    prevPage = () => {
        const {page} = this.state;

        if(page === 1) return;

        const pageNumber = page - 1;
        this.componentDidMount(pageNumber);
    }

    nextPage = () => {
        const {page, respostasInfo} = this.state;

        if(page === respostasInfo.pages) return;

        const pageNumber = page + 1;
        this.componentDidMount(pageNumber);
    }


    render(){
        const {question, responses, perg_login} = this.state;

        return(
            <div className="pergunta-info">
                <Card>
                    <Card.Header as="h5">{question.titulo}</Card.Header>
                    <Card.Body>
                        <Card.Title>{question.texto}</Card.Title>
                        <Card.Text>
                            Categoria:  {question.categoria}<br></br>
                        </Card.Text>
                        <div className="login-data">{perg_login} - {question.publicacao}</div>
                    </Card.Body>
                </Card>
                <hr />
                <p className="resposta-p">Respostas</p>
                <Card>
                    <ListGroup variant="flush">
                        {responses.map(response => (
                            <ListGroup.Item key={response._id}>
                                <p>{response.texto}</p>
                                <p className="login-data">{response.idUsuario} - {response.publicacao}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
                <div className="botoes">
                    <Button onClick={this.prevPage}>Anterior</Button>
                    <Button onClick={this.nextPage}>Proxima</Button>
                </div>
                <Form className="formulario" onSubmit={this.handleSingUp}>
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text>Responder pergunta</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl as="textarea" aria-label="With textarea" />
                    </InputGroup>
                    <Button className="botao" type="submit">Submeter resposta</Button>
                </Form>
            </div>
          
        );
    }
}


               