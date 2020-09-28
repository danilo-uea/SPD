import React from 'react';
//import api from './services/api';

import Routes from "./routes";

import Header from './components/header/header';
import Bar from './components/bar/bar';


const App = () => (
  <div className="App">
    <Header />
    <Bar />
    <Routes />
  </div>
);


export default App;
