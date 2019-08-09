const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const port = 3333;

const server = express();

mongoose.connect('mongodb+srv://root:root@cluster0-sgrla.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(express.json());
server.use(routes);

server.listen(port);