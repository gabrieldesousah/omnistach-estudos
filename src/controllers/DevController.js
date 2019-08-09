const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username });
        if(userExists){
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);
        // O axios é assíncrono, portanto ele vai trabalhar de forma paralela a sua aplicação.
        // Desta forma, o axios.get vai demorar mais tempo para obter uma resposta do que a próxima linha do código.
        // Para evitar isso, precisamos fazer com que o código aguarde a resposta
        // Sempre que você colocar o *await* dentro de uma função, é preciso definí-la como *async*
        
        // Vamos capturar os dados da resposta:
        const { name, bio, avatar_url: avatar } = response.data;
        // Estamos usando um atalho afim de fazer com que a variável origindal *avatar_url* seja renomeada para *avatar*

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        });

        console.log(`https://api.github.com/users/${username}`);

        return res.json(dev);
    }
};