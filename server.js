const express = require('express');
const server = express();

const projectRouter = require('./data/helpers/projectModel');
const actionRouter = require('./data/helpers/actionModel');

server.get('/', (req, res) => {
	res.send(`<h2>Sprint Challenge!</h2>`);
});

server.use(function (res, res, next) {
	console.log('A request just happended');
	next();
});

server.use('/data/helpers/projects', projectRouter);
server.use('/data/helpers/actions', actionRouter);

module.exports = server;
