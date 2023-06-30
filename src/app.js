const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');

const hostname = "0.0.0.0";
const port = 3001;

const server = express();

server.use(logger('dev'));

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.use(cookieParser());

server.use(cors());

const userRoute = require("./routes/userRoute");
userRoute(server);

server.use(express.static(path.join(__dirname, 'public')));

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.get('/inscription', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

server.get('/connexion', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

server.get('/profil', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

server.listen(port, hostname);