import React, {Component} from "react";
import api from "../../services/api";
import {Card, Button, Form} from "react-bootstrap";


export default class ChatAdd extends Component{
    state = {
        usuarios: [],
        selecionados: []
    }

    componentDidMount(){
        this.loadUsuarios();
    }

    loadUsuarios = async () => {
        const response = await api.get("/usuarios");
        const registrados = await api.get(`/chatUsuario/${this.props.match.params.id}`);
        const filtrado = response.data.docs.filter(e => {
            const y = registrados.data.map(r => (r.idUsuario));
            const x = y.indexOf(e._id);
            return (x === -1 ? true : false);
        })
        this.setState({usuarios: filtrado});
    }


    adicionarUsuario = () =>{
        const {selecionados} = this.state;
        selecionados.map( async (selecionado) => (
            await api.post("/chats/add",{"idUsuario": selecionado, "idChat": this.props.match.params.id})
        ))
        alert("Usuarios adicionados");
    }

    selecionarUsuario = e =>{
        e.preventDefault();
        const target = e.target;
        var {selecionados} = this.state;
        if(target.checked)
            selecionados.push(target.name)   
        else
            selecionados = selecionados.filter(selecionado => (selecionado !== target.name))
        this.setState({selecionados: selecionados})
    }

   

    render(){
        const {usuarios} = this.state;
        return(
            <div className="lista-usuarios">
                <Form>
                    {usuarios.map(usuario =>(
                        <Card key={usuario._id}>
                            <label>
                            <input 
                                type="checkbox" 
                                name={usuario._id}
                                onChange={this.selecionarUsuario}
                                ></input>
                            {usuario.login}
                        </label>
                        </Card>
                    ))}   
                </Form> 
                <Button type="submit" onClick={this.adicionarUsuario}>Adicionar usuarios selecionados</Button>
            </div>   
        );
    }
} /*{usuarios.map(usuario => (
                    <Card key={usuario._id}>
                        <Card.Header>{usuario.login}</Card.Header>
                        <Card.Body>
                            <Button>Acessar</Button>
                        </Card.Body>
                    </Card>
                 ))}*/