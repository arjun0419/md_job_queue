require('./dbConnection');

const URLcache = require('./models/urlCache');
const JobList = require('./models/jobList');

const addToJobList = (jobID, jobURL, res) => {
  const jobList = new JobList({
    jobId: jobID,
    url: jobURL,
  });

  jobList.save((err, job) => {
    if (err) {
      console.log(err);
    } else {
      res.send(`Awesome! We will add ${job.url} to our database. Please come back and check the status for ${job.jobId} in 10 mins or so.`);
      // console.log(`Added ${job.jobId} for ${job.url} to database.`);
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
      result = cache;
    }
    res.send(result);
  });
};

module.exports.saveUrlToDB = (urlObj, res) => {
  const url = new URLcache(urlObj);

  // check to see if url is already in db, if so, retreive JobID
  checkIfURLexistsInDB(urlObj.url)
    .then((response) => {
      if (response[0] && response[0].id) {
        // res.send(response);
        res.send(`Looks like we have already cached url ${urlObj.url}. Please check status of JOB ID: ${response[0].id}`);
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

