import React, {Component} from "react";
import api from "../../services/api";

export default class Register extends Component{

    state = {
        login: "",
        senha: "",
        error: ""
    };

    handleSingUp = async e => {
        e.preventDefault();
        const {login, senha} = this.state;

        if(!login || !senha){
            this.setState({error: "preencha todos os campos"});
        }
        else{
            try{
                await api.post("/usuarios",{login, senha});
                //this.props.history.push("/");
            }catch(err){
                console.log(err);
                this.setState({error: "erro ao efetuar o registro"});
                } 
            }
        }

    render(){
        return(
            <container>
                <form onSubmit={this.handleSingUp}>
        {this.state.error && <p>{this.state.error}</p>}
                    <input type="text" 
                            placeholder="Login"    
                            onChange={e => this.setState({login: e.target.value})} 
                    />
                    <input type="password" 
                            placeholder="senha"    
                            onChange={e => this.setState({senha: e.target.value})} 
                    />
                    <button type="submit">Cadastrar</button>
                </form>
            </container>
        )
    }
    };
