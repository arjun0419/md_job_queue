require('./dbConnection');

const URLcache = require('./models/urlCache');
const JobList = require('./models/jobList');
const fs = require('fs');

const addToJobList = (jobID, jobURL, res) => {
  const jobList = new JobList({
    jobId: jobID,
    url: jobURL,
  });

  jobList.save((err, job) => {
    if (err) {
      console.log(err);
    } else {
      res.send(job.jobId);
    }
  });
};

const checkIfURLexistsInDB = url => (
  URLcache.find({ url: `${url}` }, 'id', (err, ID) => {
    let result = null;
    if (err) {
      throw err;
    } else if (ID.length > 0) {
      result = ID;
    }
    return result;
  })
);

module.exports.fetchJobIDfromDB = (jobID, res) => {
  URLcache.find({ _id: jobID }, (err, cache) => {
    let result = null;
    if (err) {
      throw err;
    } else if (cache.length > 0) {
      const { html } = cache[0];
      fs.writeFile('./client/cache.html', html, (err) => {
        if (err) {
          return console.log(err);
        }
        result = cache;
        console.log('The file was saved!');
        res.send(result);
      });
    }
  });
};

module.exports.saveUrlToDB = (urlObj, res) => {
  const url = new URLcache(urlObj);

  // check to see if url is already in db, if so, retreive JobID
  checkIfURLexistsInDB(urlObj.url)
    .then((response) => {
      if (response[0] && response[0].id) {
        res.send(response[0].id);
      } else {
        url.save((err, urlSaved) => {
          if (err) {
            throw err;
          } else {
            addToJobList(urlSaved.id, urlSaved.url, res);
          }
        });
      }
    })
    .catch((error) => {
      throw error;
    });
};

