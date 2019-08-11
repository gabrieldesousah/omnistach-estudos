const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const port = 3333;

const routes = require('./routes'); // Rotas sempre depois dos requires

const server = express();

mongoose.connect('mongodb+srv://root:root@cluster0-sgrla.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(cors()); // Isto libera que a aplicação seja acessada pelo react
server.use(express.json());
server.use(routes);

server.listen(port);