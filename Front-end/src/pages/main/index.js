import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import './styles.css';

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
            <div className='lista-perguntas'>
                {perguntas.map(pergunta => (
                    <article key={pergunta._id}>
                        <strong>{pergunta.titulo}</strong>
                        <p>{pergunta.categoria}</p>
                        <p>{pergunta.idUsuario}</p>
                        <Link to={`/pergunta/${pergunta._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === perguntasInfo.pages} onClick={this.nextPage}>Proxima</button>
                </div>
            </div>
        );
    }
}