const mongoose = require('mongoose');

const { Schema } = mongoose;

const UrlCacheSchema = new Schema({
  url: String,
  html: String,
  status: String,
});

const URL = mongoose.model('URLCache', UrlCacheSchema);

module.exports = URL;

