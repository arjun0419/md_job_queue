const mongoose = require('mongoose');

const mongoDB = process.env.DB_URI;

mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
