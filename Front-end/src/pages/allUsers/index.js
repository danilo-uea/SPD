import React, {Component} from "react";
import api from "../../services/api";
import { Button, Card } from 'react-bootstrap';


export default class ChatMenu extends Component{

    state = {
        users: [],
        token: localStorage.getItem('token-do-usuario'),
    }

    componentDidMount(){
            this.loadUsers();
    }

    loadUsers = async () =>{
            const response = await api.get("/usuarios");
            this.setState({users: response.data.docs});        
    };

    deletarUser = async (id) =>{
        await api.delete(`usuarios/${id}`);
        this.loadUsers();
    }

    render(){
        const {users} = this.state;
            return(
                <div className="lista-chats">
                    {users.map(user => {
                            return(
                                <Card key={user._id} style={{ marginBottom: '20px' }}>
                                    
                                    <Card.Body>
                                        <Card.Title>{user.login}</Card.Title>
                                        <Button onClick={()=> this.deletarUser(user._id)}>deletar usuario</Button>
                                    </Card.Body>
                                </Card>
                            )
                    }
                    )}
                </div>
            );
    }
}
