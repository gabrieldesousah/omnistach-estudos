import React, {useState} from 'react'; // Todo componente do react exige sua importação
import './Login.css'; // Como apenas desejo importar o arquivo, não preciso eclarar um nome para ele

import api from '../services/api';

import logo from '../assets/logo.svg';

export default function Login({ history }) { // Esta propriedade 'history' é herdada do ReactRouterDOM

  const [username, setUsername] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/devs', {
      username,
    });

    const { _id } = response.data;

    history.push(`/dev/${_id}`); // Esta é a forma que o BrowserRouter direciona para outra página... ele adiciona um valor a URL da mesma

  }

  return (
    <div className="login-container">
      <img src={logo} alt="TinDev" />
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Digite seu usuário no GitHub" 
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}