import React, {Component} from 'react';
import api from '../../services/api';
import { Form, InputGroup, FormControl, Button, Card, ListGroup } from 'react-bootstrap';
import './styles.css'
import {data_hora} from '../../services/formatos';

export default class Question extends Component{
    state = {
        questao: {},
        respostas: [],
        usuario: {},
        page: 1,
        resp : "",
        token: localStorage.getItem('token-do-usuario'),
        adm: localStorage.getItem('isAdm'),
        id: localStorage.getItem('id-do-usuario')
    }
    
    async componentDidMount(page = 1){
        const { id } = this.props.match.params;
                
        const perguntas = await api.get(`/perguntas/${id}`);
        const { usuario, ...questao } = perguntas.data;
        this.setState({questao, usuario, page});

        this.loadRespostas();
        
    }

    loadRespostas = async () => {
        const {id} = this.props.match.params;
        const respostas = await api.get(`/respostas/${id}`);
        this.setState({respostas: respostas.data});
    }
/*
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
*/
    submeterResposta = async e => {
        e.preventDefault();
        const {resp, token} = this.state;
        const header = {"authorization": "bearer " + token}
        if(!resp || token === ""){
            console.error("Resposta invalida ou usuario nao logado");
        } else {
            try {
                await api.post("/respostas", {"texto": resp, "pergunta": this.props.match.params.id}, {headers: header});
                this.loadRespostas();
                document.getElementById('texto').value = '';
            } catch(err) {
                alert("errou");
            }
        }
    }

    perguntaAutorAdm = (id_usuario) => {
        const {adm, id} = this.state;

        if(adm === 'true' || id === id_usuario){
            return <Button onClick={() => this.removePergunta(this.props.match.params.id)}>Deletar</Button>
        }
        else
            return
    }

    

    removerResposta = async (id) => {
        await api.delete(`/respostas/remove/${id}`);
        this.loadRespostas();
    }

    removePergunta = async (id) => {
        await api.delete(`/perguntas/remove/${id}`);
        window.location.href= "/";
    }

    render(){
        const {questao, respostas, usuario, adm, id} = this.state;

        const x = this.perguntaAutorAdm(usuario._id);

        return(

            <div className="pergunta-info">
                <Card>
                    <Card.Header as="h5">{questao.titulo}</Card.Header>
                    <Card.Body>
                        <Card.Title>{questao.texto}</Card.Title>
                        <Card.Text>
                            Categoria:  {questao.categoria}<br></br>
                        </Card.Text>
                        <div className="login-data">{usuario.login} - {data_hora(questao.publicacao)}</div>
                        {x}
                   </Card.Body>
                    
                </Card>
                <hr />
                <p className="resposta-p">Respostas</p>
                <Card>
                    <ListGroup variant="flush">
                        {respostas.map(response => {
                            if(adm === 'true'|| id === response.usuario._id){
                                return (
                                    <ListGroup.Item key={response._id}>
                                <p>{response.texto}</p>
                                <p className="login-data">{response.usuario.login} - {data_hora(response.publicacao)}</p>
                                <Button onClick={() => this.removerResposta(response._id)}>Deletar</Button>
                             </ListGroup.Item>
                                )
                            }
                            else{
                                return (
                                    <ListGroup.Item key={response._id}>
                                <p>{response.texto}</p>
                                <p className="login-data">{response.usuario.login} - {response.publicacao}</p>
                             </ListGroup.Item>
                                )
                            }
                        }       
                    )}
                    </ListGroup>
                </Card>
                <Form className="formulario" onSubmit={this.submeterResposta}>
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text>Responder pergunta</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="texto" as="textarea" aria-label="With textarea" onChange={e => this.setState(({resp: e.target.value}))}/>
                    </InputGroup>
                    <Button className="botao" type="submit">Submeter resposta</Button>
                </Form>
            </div>
        );
    }
}


               