import React, { Component } from "react";
import api from "../../services/api";
import { Button, Card } from 'react-bootstrap';
import './styles.css';
import {data_hora} from '../../services/formatos';

export default class Main extends Component {
    state = {
        perguntas: [],
        perguntasInfo: {},
        page: 1
    }

    //Execultar uma ação logo que o componente é exibido em tela
    componentDidMount(){ 
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/perguntas?page=${page}`);

        const { docs, ...perguntasInfo } = response.data;
        this.setState({ perguntas: docs, perguntasInfo, page});
    };

    prevPage = () => {
        const {page} = this.state;

        if(page === 1) return;

        const pageNumber = page - 1;
        this.loadProducts(pageNumber);
    }

    nextPage = () => {
        const {page, perguntasInfo} = this.state;

        if(page === perguntasInfo.pages) return;

        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    }

    render(){
        const { perguntas, page, perguntasInfo } = this.state;
        
        return (
            <div className="lista-perguntas">
                {perguntas.map(pergunta => (
                    <Card key={pergunta._id} style={{ marginBottom: '20px' }}>
                        <Card.Header>{pergunta.titulo}</Card.Header>
                        <Card.Body>
                            <Card.Title>{pergunta.texto}</Card.Title>
                            <Card.Text className="login-data">{data_hora(pergunta.publicacao)}</Card.Text>
                            <Button href={`pergunta/${pergunta._id}`}>Acessar</Button>
                        </Card.Body>
                    </Card>
                ))}
                <div className="botoes">
                    <Button disabled={page === 1} onClick={this.prevPage}>Anterior</Button>
                    <Button disabled={page === perguntasInfo.pages} onClick={this.nextPage}>Proxima</Button>
                </div>
            </div>
        );
    }
}