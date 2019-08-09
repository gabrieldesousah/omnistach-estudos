// Se faz necessário criar um novo controller, o LikeController no lugar de por este método
// no DevController. Isso é devido a boa prática de deixar apenas os principais métodos relacionados
// ao controller: INDEX, SHOW, STORE, UPDATE e DELETE

const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { devId } = req.params;
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev) {
            return res.status(400).json({error: 'Dev not exists'});
        }

        if(targetDev.likes.includes(loggedDev._id)) {
            console.log('Deu Match');
        } 
        if(loggedDev.likes.includes(targetDev._id)) {
            return res.status(400).json({error: 'Já curtiu anteriormente'});
        }

        // Para adicionar na base de likes do desenvoldor logado:
        loggedDev.likes.push(targetDev._id); // Isto apenas coloca instanciado a soliticação
        await loggedDev.save();

        return res.json(loggedDev);
    }
}