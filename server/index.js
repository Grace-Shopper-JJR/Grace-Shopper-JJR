require('dotenv').config();

const express = require('express');
const chalk = require('chalk');
const path = require('path');

const PORT = process.env.PORT || 3000;
const server = express();

const apiRouter = require('./api');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const { startDb, testDB } = require('./db/seed');

server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());

server.use((req, res, next) => {
    console.log("<----Body Logger START---->");
    console.log(req.body);
    console.log("<----Body Logger END---->");

    next();
});

server.use(express.static(path.join(__dirname, '../dist')))

server.use("/resources", express.static(path.join(__dirname, '../resources')))

server.use('/api', apiRouter);

server.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
})

server.listen(PORT, () => {
    console.log(chalk.green(`Server is listening on PORT: ${PORT}`))
})

