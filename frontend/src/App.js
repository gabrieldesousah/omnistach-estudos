import React from 'react';
import './App.css';

import Routes from './routes';

// Vamos ter algumas páginas... tela de login, tela de listagem de desenvolvedores e afins.
// Para manter isso organizado, vamos na pasta SRC criar um novo diretório chamado de 'pages' para esta organização

// Este conteúdo abaixo, do HTML dentro JavaScript é chamado de JSX

function App() {
  return (
    <Routes />
  );
}

export default App;
