require('dotenv').config();
var express = require('express');
var logger = require('morgan');

var usuariosRouter = require('./routes/usuariosRouter');
var logger = require('morgan');

var produtosRouter = require('./routes/produtosRouter');

var app = express();

var express = require('express');
var logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/usuarios', usuariosRouter);
app.use('/produtos', produtosRouter);


module.exports = app;
