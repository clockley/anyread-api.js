const Sentry = require('@sentry/node');
const express = require('express');
const readerController = require('./controllers/readerController');
const errorEndpoint = require('./errorEndpoint');

const app = express();

app.get('/', (req, res) => {
  res.sendfile('index.html');
});

app.get('/parse', readerController.parseUrl);

app.get('/debug-sentry', (req, res) => {
  throw new Error('My first Sentry error!');
});

app.get('/debug-sentry-2', (req, res) => {
  throw new Error('My second Sentry error!');
});

app.get('/debug-sentry-3', (req, res) => {
  throw new Error('My third Sentry error!');
});

app.get('/debug-sentry-4', (req, res) => {
  throw new Error('My last Sentry error!');
});

app.get('/debug-sentry-5', (req, res) => {
  throw new Error('My last Sentry error, for real this time!');
});

errorEndpoint(app);

app.use(Sentry.Handlers.errorHandler());

module.exports = app;
