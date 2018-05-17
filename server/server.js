require('dotenv').config();
require('../worker/worker');

const app = require('./app');

const port = process.env.API_PORT || 3000;

app.listen(port, () => console.log('App listening on port 3000'));
