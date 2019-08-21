const express = require('express');
const readerController = require('./controllers/readerController');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

app.get('/', (req, res) => {
  res.sendfile('index.html');
});

app.get('/parse', readerController.parseUrl);
app.post('/upload', readerController.parseFile);

module.exports = app;
