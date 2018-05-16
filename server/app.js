const express = require('express');

const app = express();
const path = require('path');

const statFilesPath = path.resolve(__dirname, '../client/dist');

app.use(express.static(statFilesPath));

app.get('/', (req, res) => {
  res.send();
});

app.get('/api/:jobID/status', (req, res) => {
  const { jobID } = req.params;
  console.log(`get request received in server for Job ID ${jobID}`);
  res.send(`hello from server, we got your request for job ID ${jobID}`);
});

app.post('/api/:url/post', (req, res) => {
  const { url } = req.params;
  console.log(`post request received in server for Job ID ${url}`);
  res.send(`hello from server, we got your request for URL ${url}. We will cache this html shortly. Please come back soon and check JOB ID 019`);
});

module.exports = app;

