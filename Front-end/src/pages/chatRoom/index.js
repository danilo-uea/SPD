import React, {Component} from 'react';
import api from '../../services/api';
import { Form, InputGroup, FormControl, Button} from 'react-bootstrap';
import appSocket from '../../services/appSocket';


export default class ChatRoom extends Component{
    state = {
        mensagens: [],
        msg: "",
        token: localStorage.getItem('token-do-usuario')
    }
    
    async componentDidMount(){
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
            alert("preencha o texto")
            this.setState({error: "preencha todos os campos"});
        }
        else{
            try{
                await api.post("/mensagens",{"idChat":id, texto: msg}, {headers: header});
                appSocket.emit('sendChat', id);
            }catch(err){
                console.log(err);
                this.setState({error: "erro enviar a mensagem"});
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
        
        const { data } = mensagens;

        this.setState({mensagens: data});
    }

    render(){
        this.novaMensagem();
        const {mensagens} = this.state;
        return(
            <div className="chat-mensager">
                {mensagens.map(mensagem => (
                    <li key={mensagem._id}>
                        <p>{mensagem.texto}
                            <small>
                                <i> {mensagem.idUsuario.login} </i>
                            </small>
                        </p>
                    </li>
                ))}

                <hr />

               <Form className="formulario" onSubmit={this.submeterResposta}>
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text>Insira uma mensagem</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl as="textarea" aria-label="With textarea" onChange={e => this.setState(({msg: e.target.value}))}/>
                    </InputGroup>
                    <Button className="botao" type="submit">Enviar</Button>
                </Form>
                <hr />
                <Button href={`/chat/add/${this.props.match.params.id}`}>Adicionar novos usuarios</Button>
            </div>      
        );
    }
}