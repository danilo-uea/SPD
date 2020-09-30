import React, {Component} from 'react';
import api from '../../services/api';
import './styles.css'

export default class Question extends Component{

    state = {
        question: {},
        responses: [],
        respostasInfo: {},
        login: '',
        page: 1
    }
    
    async componentDidMount(page = 1){
        const {id} = this.props.match.params;
        
        const perguntas = await api.get(`/perguntas/${id}`);
        const response1 = await api.get(`/respostas/${id}?page=${page}`);
        const resp_usuario = await api.get(`/usuarios/${perguntas.data.idUsuario}`);
        
        const { docs, ...respostasInfo } = response1.data;
        const { data } = perguntas;
        const { login} = resp_usuario.data;
        
        this.setState({question: data, responses: docs, respostasInfo, login, page})

        console.log(this.props);
    }

    prevPage = () => {
        const {page} = this.state;

        if(page === 1) return;

        const pageNumber = page - 1;
        this.componentDidMount(pageNumber);
    }

    nextPage = () => {
        const {page, respostasInfo} = this.state;

        if(page === respostasInfo.pages) return;

        const pageNumber = page + 1;
        this.componentDidMount(pageNumber);
    }


    render(){
        const {question, responses, login} = this.state;
        return(
            <div className="pergunta-info">
                <h1>{question.titulo}</h1>
                <h2>Categoria: {question.categoria}</h2>
                <h3>Usuario: {login}</h3>
                <p>{question.texto}</p>

                <div className='lista-resposta'>
                {responses.map(response => (
                    <article key={response._id}>
                        <h3>{response.idUsuario}</h3>
                        <p>{response.texto}</p>
                    </article>
                ))}
                <div className="actions">
                    <button onClick={this.prevPage}>Anterior</button>
                    <button onClick={this.nextPage}>Proxima</button>
                </div>
            </div>
            <div>
                <h1>Responder pergunta</h1>
                <input placeholder="Resposta"></input>
                <button>submeter resposta</button>
            </div>
            </div>
          
        );
    }
}


               