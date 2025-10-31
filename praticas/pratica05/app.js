var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const tarefaRouter = require('./routes/tarefaRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/tarefas', tarefaRouter);

module.exports = app;