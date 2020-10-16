import React, {Component} from "react";
import api from "../../services/api";
import { Button, Card, Alert } from 'react-bootstrap';


export default class ChatMenu extends Component{

    state = {
        chats: [],
        token: localStorage.getItem('token-do-usuario')
    }

    componentDidMount(){
        if(this.state.token !== "")
            this.loadChat();
    }

    loadChat = async () =>{
            const header={"authorization": "bearer " + this.state.token}
            const response = await api.get("/usuarioChat", {headers: header});
            const chats = response.data.map(chat => chat.idChat);
            this.setState({chats: chats});        
    };

    render(){
        const {chats, token} = this.state;
        if (token === "")
            return(
                <Alert variant="success">
                    <Alert.Heading>Por favor, faça o login para poder utilizar o chat.</Alert.Heading>
                </Alert>
            );
        else
            return(
                <div className="lista-chats">
                    {chats.map(chat => (
                    <Card key={chat._id} style={{ marginBottom: '20px' }}>
                       <Card.Header>{chat.titulo}</Card.Header>
                       <Card.Body>
                           <Button href={`chat/${chat._id}`}>Acessar</Button>
                       </Card.Body>
                    </Card>
                    ))}
                     <div>
                        <Button href="/criarChat">Criar chat</Button>
                    </div>
                </div>
            );
    }
}