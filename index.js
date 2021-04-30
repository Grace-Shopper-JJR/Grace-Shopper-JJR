require('dotenv').config();

const express = require('express');
const chalk = require('chalk');
const path = require('path');

const client = require('./db/client_db');

const PORT = process.env.PORT || 5000;
const server = express();

server.use('/api', require('./routes'));

// const apiRouter = require('./routes');
// server.use('/api', apiRouter);

const morgan = require('morgan');
server.use(morgan('dev'));

const bodyParser = require('body-parser');
server.use(bodyParser.json());

// server.use(bodyParser.urlencoded({ extended: true }));
// server.use(express.json());

server.use((req, res, next) => {
    console.log("<----Body Logger START---->");
    console.log(req.body);
    console.log("<----Body Logger END---->");

    next();
});

server.use(express.static(path.join(__dirname, '../dist')))

server.use("/resources", express.static(path.join(__dirname, '../resources')))

server.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
})


server.listen(PORT, async () => {
  console.log(chalk.green(`Server is running on ${ PORT }!`));

  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});
