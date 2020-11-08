import React, {Component} from "react";
import api from "../../services/api";
import { Button, Card } from 'react-bootstrap';


export default class ChatMenu extends Component{

    state = {
        chats: [],
    }

    componentDidMount(){
            this.loadChat();
    }

    loadChat = async () =>{
            const response = await api.get("/chats");
            this.setState({chats: response.data.docs});        
    };

    deletarChat = async (id) =>{
        await api.delete(`chats/remove/${id}`);
        this.loadChat();
    }

    render(){
        const {chats} = this.state;
            return(
                <div className="lista-chats">
                    {chats.map(chat => {
                            return(
                                <Card key={chat._id} style={{ marginBottom: '20px' }}>
                                    <Card.Header>{chat.titulo}</Card.Header>
                                    <Card.Body>
                                        <hr />
                                        <Button onClick={()=> this.deletarChat(chat._id)}>deletar chat</Button>
                                    </Card.Body>
                                </Card>
                            )
                    }
                    )}
                </div>
            );
    }
}
