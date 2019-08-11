import React from 'react'; // Todo componente do react exige sua importação
import './Login.css'; // Como apenas desejo importar o arquivo, não preciso eclarar um nome para ele

import logo from '../assets/logo.svg';

export default function Login() {
  return (
    <div className="login-container">
      <img src={logo} alt="TinDev" />
      <form>
        <input placeholder="Digite seu usuário no GitHub" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}