require('./dbConnection');

const URL = require('./models/urlCache');
const JobList = require('./models/jobList');

const addToJobList = (jobID, jobURL) => {
  const jobList = new JobList({
    jobId: jobID,
    url: jobURL,
  });

  jobList.save((err, job) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Added ${job.jobId} for ${job.url} to database.`);
    }
  });
};

module.exports.saveUrlToDB = (urlObj, res) => {
  const url = new URL(urlObj);
  // Save the new model instance, passing a callback
  url.save((err, url) => {
    if (err) {
      console.log(err);
    } else {
      addToJobList(url.id, urlObj.url);
      res.send(`Awesome! We will add ${urlObj.url} to our database. Please come back and check the status for ${url.id} in 10 mins or so.`);
    }
  });
};

