const express = require('express');
const path = require('path');

const router = express.Router();

const app = express();
const statFilesPath = path.resolve(__dirname, '../client/dist');
const { saveUrlToDB, fetchJobIDfromDB } = require('../db/dbHelpers');

app.use(express.static(statFilesPath));

app.get('/', (req, res) => {
  res.send();
});

app.get('/cache', (req, res) => {
});

app.get('/api/:jobID/status', (req, res) => {
  const { jobID } = req.params;
  fetchJobIDfromDB(jobID, res);
});

app.post('/api/:urlToSave/post', (req, res) => {
  const { urlToSave } = req.params;

  const url = {
    url: urlToSave,
    html: '',
    status: 'pending',
  };

  saveUrlToDB(url, res);
});

module.exports = app;
