import React, {Component} from 'react';
import api from '../../services/api';
import { Form, InputGroup, FormControl, Button, Alert, ListGroup, Card} from 'react-bootstrap';
import appSocket from '../../services/appSocket';

export default class ChatRoom extends Component{
    state = {
        chat: {},
        mensagens: [],
        msg: "",
        token: localStorage.getItem('token-do-usuario')
    }
    
    async componentDidMount() {
        const {id} = this.props.match.params;
        appSocket.emit('room', id);
        this.loadMensagens();
    }

    submeterResposta = async e => {
        e.preventDefault();
        const {id} = this.props.match.params;
        const {msg, token} = this.state;
        const header={"authorization": "bearer " + token}
        if(msg === ""){
            this.setState({error: "Preencha o texto da mensagem"});
        }
        else {
            try {
                await api.post("/mensagens",{"idChat":id, texto: msg}, {headers: header});
                appSocket.emit('sendChat', id);
                this.setState({error: ""});
                document.getElementById('texto').value = '';
            } catch(err) {
                console.log(err);
                this.setState({error: "Erro ao enviar a mensagem"});
            } 
        }
    }

    novaMensagem = () => {
        appSocket.on('updateChat', ()=>{
            this.loadMensagens();
        })
    }

    loadMensagens = async () =>{
        const {id} = this.props.match.params;
        const mensagens = await api.get(`/mensagens/chat/${id}`);
        const chatGet = await api.get(`chats/${id}`);
        const { data } = mensagens;
        const { chat } = chatGet.data;
        this.setState({mensagens: data, chat});
    }

    render(){
        this.novaMensagem();
        const {mensagens, chat} = this.state;
        
        return(
            <div>
                <Card>
                    <Card.Header><b>{chat.titulo}</b></Card.Header>
                    <ListGroup variant="flush">
                    {mensagens.map(mensagem => (
                        <ListGroup.Item key={mensagem._id}>
                            <div style={{ width: '100%' }}>{mensagem.texto}</div>
                            <div style={{ width: '100%', color: 'dodgerblue' }}>
                                <i> {mensagem.idUsuario.login} </i>
                            </div>
                        </ListGroup.Item>
                    ))}
                    </ListGroup>
                </Card>
                <hr />
                <Form className="formulario" onSubmit={this.submeterResposta}>
                    {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text>Insira uma mensagem</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="texto" as="textarea" aria-label="With textarea" onChange={e => this.setState(({msg: e.target.value}))}/>
                    </InputGroup>
                    <Button className="botao" type="submit">Enviar</Button>
                </Form>
                <hr />
                <Button href={`/chat/add/${this.props.match.params.id}`}>Adicionar novos usuarios</Button>
            </div>      
        );
    }
}