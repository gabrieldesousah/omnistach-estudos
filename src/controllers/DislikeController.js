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

        if(loggedDev.dislikes.includes(targetDev._id)) {
            return res.status(400).json({error: 'Já descurtiu anteriormente'});
        }

        // Para adicionar na base de likes do desenvoldor logado:
        loggedDev.dislikes.push(targetDev._id); // Isto apenas coloca instanciado a soliticação
        await loggedDev.save();

        return res.json(loggedDev);
    }
}