import React, {Component} from "react";
import api from "../../services/api";

export default class Login extends Component{

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
                const response = await api.get("/usuarios/" + login + "/" + senha);
                //this.props.history.push("/");
                console.log(response.data);
            }catch(err){
                console.log(err);
                this.setState({error: "erro ao prucurar o registro"});
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
                    <button type="submit">Efetuar Login</button>
                </form>
            </container>
        )
    }
    };
