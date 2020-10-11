import React, {Component} from 'react';
import api from '../../services/api';
import { Form, InputGroup, FormControl, Button, Card, ListGroup } from 'react-bootstrap';
import './styles.css'

export default class Question extends Component{
    state = {
        questao: {},
        respostas: [],
        usuario: {},
        page: 1,
        resp : "",
        token: localStorage.getItem('token-do-usuario')
    }
    
    async componentDidMount(page = 1){
        const { id } = this.props.match.params;
                
        const perguntas = await api.get(`/perguntas/${id}`);
        const respostas = await api.get(`/respostas/${id}`);
        const { data } = respostas;
        const { usuario, ...questao } = perguntas.data;
        
        this.setState({questao, usuario, respostas: data, page});
    }

    prevPage = () => {
        const { page } = this.state;

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

    submeterResposta = async e => {
        e.preventDefault();
        const {resp, token} = this.state;
        const header = {"authorization": "bearer " + token}
        if(!resp || token === ""){
            console.error("Resposta invalida ou usuario nao logado");
        } else {
            try {
                await api.post("/respostas", {"texto": resp, "pergunta": this.props.match.params.id}, {headers: header});
                this.componentDidMount();
            } catch(err) {
                alert("errou");
            }
        }

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
                <Form className="formulario" onSubmit={this.submeterResposta}>
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text>Responder pergunta</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl as="textarea" aria-label="With textarea" onChange={e => this.setState(({resp: e.target.value}))}/>
                    </InputGroup>
                    <Button className="botao" type="submit">Submeter resposta</Button>
                </Form>
            </div>
        );
    }
}


               