const express = require('express');

const app = express();
const path = require('path');

const statFilesPath = path.resolve(__dirname, '../client/dist');

app.use(express.static(statFilesPath));

app.get('/', (req, res) => {
  res.send();
});

module.exports = app;