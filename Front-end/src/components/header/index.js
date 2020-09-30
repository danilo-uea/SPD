import React from 'react';
import './styles.css';

const Header = () => (
    <header Class= "cabecalho">
        <nav>
            <input type="checkbox" id="check"></input>
            <label for="check" Class="checkbtn">
                <i Class="fas fa-bars"></i>
            </label>
            <a href="/"><label Class="logo">Logo X</label></a>
            <ul>
                <li><a href="/">home</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/registrar">Cadastrar</a></li>
            </ul>
        </nav>
    </header>
);

export default Header;
