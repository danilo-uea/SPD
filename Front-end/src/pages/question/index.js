import React, {Component} from 'react';
import api from '../../services/api';
import axios from 'axios';

export default class Question extends Component{

        state = {
        question: {},
        responses: [],
        respostasInfo: {},
        page: 1
    }
    
    

    async componentDidMount(page = 1){
        const {id} = this.props.match.params;
        
        const response = await axios.all([
            axios.get('http://localhost:3001/perguntas/' + id),
            axios.get('http://localhost:3001/respostas/' + id + '?page=' + page)
        ])

        const {docs, ...respostasInfo} = response[1].data;

        this.setState({question: response[0].data, responses: docs, respostasInfo, page})

        console.log(this.props);

    }


    prevPage = () => {
        const {page, respostasInfo} = this.state;

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
        const {question, responses} = this.state;
        return(
            <div className="pergunta-info">
                <h1>{question.titulo}</h1>
                <h2>{question.categoria}</h2>
                <h3>{question.idUsuario}</h3>
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


               