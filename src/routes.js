const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

const routes = express.Router();

// routes.get('/', (req, res) => {
//     return res.json({ 'message': `Olá ${req.query.name}`}); //Template String
//     // req é a requisição
//     // req.query captura todos os parâmetros da requisição, no caso via get
// });

// routes.post('/devs', (req, res) => {
//     console.log(req.body);
//     return res.json({ ok: true });
// })

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);


module.exports = routes; // O module.exports permite que o conteúdo deste script seja usado por quem o está requirindo
