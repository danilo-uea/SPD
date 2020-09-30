import React, {Component} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import Main from "./pages/main/index";
import Login from "./pages/login/index";
import Register from "./pages/register/index";
import Question from "./pages/question/index";

export default class Routes extends Component{
    constructor(){
        super();
        this.state = {idUser: ""};
    }

    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/login" component={Login} />
                    <Route path="/registrar" component={Register} />
                    <Route path="/pergunta/:id" component={Question} idUser={this.state.idUser}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

/*
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/registrar" component={Register} />
            <Route path="/pergunta/:id" component={Question} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
*/