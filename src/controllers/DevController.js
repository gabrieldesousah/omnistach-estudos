const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res) {
        const { user } = req.headers;
        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            // Precisamos de 3 filtros: 
            // Não pode ser o usuário logado
            // Não pode ser quem ele já curtiu
            // Não pode ser quem ele dispensou
            // Nesse caso, usamos o operador $and para que todos os filtros sejam do tipo AND
            $and: [
                { _id: { $ne: user } }, // $ne = "not equal", ou seja, não queremos que o id do usuário buscado seja igual ao do usuário logado
                { _id: { $nin: loggedDev.likes } }, // $nin = "not in", estamos passando um array com a lista de todos os contatos que teve curtidas
                { _id: { $nin: loggedDev.dislikes } },
            ]
        })

        return res.json(users);
    },
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