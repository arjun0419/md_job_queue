// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

// const db = mongoose.connect('mongodb://guest:guestpw@ds225010.mlab.com:25010/url_cache_md');


// const mongoose = require('mongoose');

//  Import the mongoose module
const mongoose = require('mongoose');

//  Set up default mongoose connection
const mongoDB = `mongodb://${process.env.MLABUSER}:${process.env.MLABPW}@ds225010.mlab.com:25010/${process.env.DB}`;
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//  Get the default connection
const db = mongoose.connection;

//  Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
