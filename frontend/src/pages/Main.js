import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Main.css';

import api from '../services/api';

import logo from "../assets/logo.svg";
import like from "../assets/like.svg";
import dislike from "../assets/dislike.svg";

export default function Main({match}) {
  const [users, setUsers] = useState([]);

  useEffect( () => {
    async function loadUser() {
      const response = await api.get('/devs', {
        headers: {
          user: match.params.id
        }
      });
      
      setUsers(response.data);
    }

    loadUser();
  }, [match.params.id]);

  async function handleLike(id) {
    // Diferentemente da requisição do tipo GET, a POST tem como segundo parâmetro o corpo da requisição e o cabeçalho precisa ser colocado como terceiro parâmetro
    await api.post(`/devs/${id}/likes`, null, {
      headers: {
        user: match.params.id
      }
    });

    setUsers(users.filter(user => user._id !== id));
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: {
        user: match.params.id
      }
    });

    setUsers(users.filter(user => user._id !== id));
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="TinDev"/>
      </Link>
      { users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id} > {/* O React exige que dentro de um .map() o primeiro elemento possua um id único na propriedade key. Isto é importante para evitar que ele renderize toda a página novamente */} 
              <img src={user.avatar} alt={user.user} className="picture-profile" />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons">
                {/* <button type="button" onClick={handleDislike(user._id)}>  Desta forma não funciona pois está declarando e executando a função. Para contornar isso, vamos colocar uma outra função chamando previamente ela */}
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="Dislike"/>
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="Like"/>
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Acabou :(</div>
      )}
    </div>
  )
}