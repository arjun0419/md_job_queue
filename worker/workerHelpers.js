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

  // return URLcache.findOneAndUpdate(query, update, options, (err) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     JobList.findOneAndRemove({ jobId: jobID }, (err2, job) => {
  //       if (err2) {
  //         console.error(err2);
  //       } else if (job) {
  //         console.log('job found and removed');
  //       }
  //     });
  //   }
  // });
  return URLcache.findOneAndUpdate(query, update, options)
    .then(() => {
      console.log("got here after updating html")
      JobList.findOneAndRemove({ jobId: jobID })
        .then(() => {
          console.log('job found and removed');
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
};

const fetchHTML = (url) => {
  return axios.get(`http://www.${url}`)
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
