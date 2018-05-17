const axios = require('axios');
require('../db/dbConnection');
const URLcache = require('../db/models/urlCache');
const JobList = require('../db/models/jobList');

const updateURLCache = (jobID, html) => {
  const query = { _id: jobID };
  const update = {
    html,
    status: 'complete',
  };

  const options = {
    new: true,
    fields: 'id status url',
  };

  URLcache.findOneAndUpdate(query, update, options, (err) => {
    if (err) {
      console.log(err);
    } else {
      JobList.findOneAndRemove({ jobId: jobID }, (err2, job) => {
        if (err2) {
          console.log(err2);
        } else if (job) {
          console.log('job found and removed');
        }
      });
    }
  });
};

const fetchHTML = (url) => {
  return axios.get(`http://${url}`)
    .then(response => (
      (response.data)
    ))
    .catch(error => (
      (null)
    ));
};

const sendHTML = (jobURL, jobID) => {
  fetchHTML(jobURL)
    .then((response) => {
      updateURLCache(jobID, response)
        .then(() => console.log('update completed!'));
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports.workerTasks = () => {
  console.log('Worker is running now (runs every 1 minute)!', new Date());
  JobList.find({}, 'jobId url', (err, jobs) => {
    if (err) return console.log(err);
    if (jobs.length > 0) {
      console.log(`worker has ${jobs.length} jobs to complete`);
      jobs.forEach((job) => {
        const jobURL = job.url;
        const jobID = job.jobId;
        console.log('From for each => jobURL :', jobURL, 'jobID: ', jobID);
        sendHTML(jobURL, jobID);
      });
    } else {
      console.log('No Jobs found for worker');
    }
  });
};
