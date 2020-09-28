import React, {Component} from "react";
import api from "../../services/api";
import {Link} from "react-router-dom";

export default class Main extends Component {

    state = {
        perguntas: [],
        perguntasInfo: {},
        page: 1
    }

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get('/perguntas?page=' + page);

        const{docs, ...perguntasInfo} = response.data;

        this.setState({ perguntas: docs, perguntasInfo, page});
    };

    prevPage = () => {
        const {page, perguntasInfo} = this.state;

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

        const {perguntas} = this.state;

        return (
            <div className='lista-perguntas'>
                {perguntas.map(pergunta => (
                    <article key={pergunta._id}>
                        <Link to={"/pergunta/" + pergunta._id}>{pergunta.titulo}</Link>
                        <p>{pergunta.categoria}</p>
                        <p>{pergunta.idUsuario}</p>
                    </article>
                ))}
                <div className="actions">
                    <button onClick={this.prevPage}>Anterior</button>
                    <button onClick={this.nextPage}>Proxima</button>
                </div>
            </div>
        )
    }
}