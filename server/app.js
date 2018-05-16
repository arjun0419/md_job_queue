const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');

const app = express();
const statFilesPath = path.resolve(__dirname, '../client/dist');
const { saveUrlToDB } = require('../db/dbHelpers');

app.use(express.static(statFilesPath));
// app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send();
});

app.get('/api/:jobID/status', (req, res) => {
  const { jobID } = req.params;
  res.send(`hello from server, we got your request for job ID ${jobID}`);
});

app.post('/api/:urlToSave/post', (req, res) => {
  console.log('got request to save', req.params);
  const { urlToSave } = req.params;

  const url = {
    url: urlToSave,
    html: '',
    status: 'pending',
  };

  saveUrlToDB(url, res);
});

module.exports = app;
