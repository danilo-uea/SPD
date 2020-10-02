import React, {Component} from 'react';
import api from '../../services/api';
import { Form, InputGroup, FormControl, Button, Card, ListGroup } from 'react-bootstrap';
import './styles.css'

export default class Question extends Component{
    state = {
        questao: {},
        respostas: [],
        //respostasInfo: {},
        usuario: {},
        page: 1
    }
    
    async componentDidMount(page = 1){
        const {id} = this.props.match.params;
        
        const perguntas = await api.get(`/perguntas/${id}`);
        //const respostas = await api.get(`/respostas/${id}?page=${page}`);
        const respostas = await api.get(`/respostas/${id}`);
        const { data } = respostas;
        
        //const { docs, ...respostasInfo } = responstas.data;
        const { usuario, ...questao } = perguntas.data;
        
        this.setState({questao, usuario, respostas: data, page});
        //this.setState({question: data, page});
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
        const {questao, respostas, usuario} = this.state;

        return(
            <div className="pergunta-info">
                <Card>
                    <Card.Header as="h5">{questao.titulo}</Card.Header>
                    <Card.Body>
                        <Card.Title>{questao.texto}</Card.Title>
                        <Card.Text>
                            Categoria:  {questao.categoria}<br></br>
                        </Card.Text>
                        <div className="login-data">{usuario.login} - {questao.publicacao}</div>
                    </Card.Body>
                </Card>
                <hr />
                <p className="resposta-p">Respostas</p>
                <Card>
                    <ListGroup variant="flush">
                        {respostas.map(response => (
                            <ListGroup.Item key={response._id}>
                                <p>{response.texto}</p>
                                <p className="login-data">{response.usuario.login} - {response.publicacao}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
                {/* <div className="botoes">
                    <Button onClick={this.prevPage}>Anterior</Button>
                    <Button onClick={this.nextPage}>Proxima</Button>
                </div> */}
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


               