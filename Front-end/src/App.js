import React from 'react';
import './styles.css'
import Header from './components/header';
import Bar from './components/bar';
import Routes from "./routes";

const App = () => (
  <div className="App">
    <Header />
    <Bar />
    <Routes />
  </div>
);

export default App;
