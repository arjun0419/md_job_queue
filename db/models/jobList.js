const mongoose = require('mongoose');

const { Schema } = mongoose;

const jobListSchema = new Schema({
  jobId: String,
  url: String,
});

const JobList = mongoose.model('JobList', jobListSchema);

module.exports = JobList;

