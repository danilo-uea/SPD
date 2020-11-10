import React, {Component} from 'react';
import { Card, Button} from 'react-bootstrap';
import api from '../../services/api';

export default class Header extends Component{

    state = {
        resultados: []
    }

    componentDidMount(){
        this.loadPesquisa();
    }

    loadPesquisa = async () =>{
        const {categoria} = this.props.match.params;
        const response = await api.get(`perguntas/pesquisar/${categoria}`);
        this.setState({"resultados": response.data});
    }
    
    render(){
        const {resultados} = this.state;
        const {categoria} = this.props.match.params
        return(
            <div>
                <p className="resultado">Foram encontrados {resultados.length} resultados para a categoria: {categoria}</p>
                {resultados.map(pergunta => (
                    <Card key={pergunta._id} style={{ marginBottom: '20px' }}>
            <Card.Header>{pergunta.titulo}</Card.Header>
            <Card.Body>
                <Card.Title>{pergunta.texto}</Card.Title>
                <Card.Text className="login-data">{pergunta.publicacao}</Card.Text>
                <Button href={`pergunta/${pergunta._id}`}>Acessar</Button>
            </Card.Body>
        </Card>
    ))}   
            </div>
    
    );
    }
}