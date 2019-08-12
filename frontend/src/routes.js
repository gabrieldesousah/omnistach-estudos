import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; // O BrowserRoute simula no navegador a rota comument conhecida. Também existe outras modalidades, como o HashRouter que diexa a URL com o {root}#{caminho}

// Tudo no React é trabalhado como componentes, inclusive as rotas 

import Login from './pages/Login';
import Main from './pages/Main';

export default function Routes() {
  return (
    <BrowserRouter>
      {/* O React não irá analisar o path por inteiro, apenas o começo dele.
        Portanto, se deseja algo que não vai dar conflito, é preciso usar o EXACT */}
      <Route path="/" exact component={Login} />
      <Route path="/dev/:id" component={Main} />
    </BrowserRouter>
  );
}