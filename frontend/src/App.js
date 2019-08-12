// Os 3 princípios/conceitos do React:
// Componente
// Estado
// Propriedade - qualquer atributo colocado em uma tag do jsx(trablahada via o props)


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
