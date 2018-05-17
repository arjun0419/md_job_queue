const axios = require('axios');
require('../db/dbConnection');
const URLcache = require('../db/models/urlCache');
const JobList = require('../db/models/jobList');


module.exports.fetchHTML = (url) => {
  console.log(url);
  return axios.get(`http://${url}`)
    .then(response => (
      (response.data)
    ))
    .catch(error => (
      (null)
    ));
};

module.exports.updateURLCache = (jobID, html) => {
  // const query = { url: 'www.yahoo.com' };
  const query = { _id: jobID };

  const update = {
    html: html,
    status: 'complete',
  };

  const options = {
    new: true,
    fields: 'id status url',
  };

  console.log('From Cache Update => ', 'jobID', jobID);

  // console.log("html: ", html.toString());

  URLcache.findOneAndUpdate(query, update, options, (err, doc) => {
  // URLcache.find({ url: 'www.yahoo.com' }, 'id, status', (err, DOc) => {
    if (err) {
      console.log(err);
    } else {
      JobList.findOneAndRemove({ jobId: jobID }, (err2, job) => {
        if (err2) {
          console.log(err2);
        }
        if (job) {
          console.log('job found and removed');
        } else {
          console.log('No user found');
        }
      });
    }
  });
};
