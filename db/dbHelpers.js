require('./dbConnection');

const URLcache = require('./models/urlCache');
const JobList = require('./models/jobList');

const addToJobList = (jobID, jobURL, res) => {
  const jobList = new JobList({
    jobId: jobID,
    url: jobURL,
  });

  jobList.save()
    .then(() => {
      const response = {
        id: jobID,
        status: 'new',
        log: 'success',
      };
      res.send(response);
    })
    .catch((err) => {
      res.send({ id: null, status: 'error', log: err });
    });
};

const checkIfURLexistsInDB = (url) => {
  let result = null;
  return URLcache.findOne({ url: `${url}` }, 'id')
    .then((cache) => {
      result = cache;
      return result;
    })
    .catch((err) => {
      result = { id: null, status: 'error', log: err };
      return result;
    });
};

module.exports.fetchJobIDfromDB = (jobID, res) => {
  let result = null;
  URLcache.findById(jobID)
    .then((cache) => {
      if (cache.id) {
        result = {
          url: cache.url,
          status: cache.status,
          html: cache.html,
        };
        res.send(result);
      }
    })
    .catch(() => {
      res.send({ id: null, status: 'Not Found' });
    });
};

module.exports.saveUrlToDB = (urlObj, res) => {
  const url = new URLcache(urlObj);
  checkIfURLexistsInDB(urlObj.url)
    .then((response) => {
      if (response !== null) {
        const result = {
          status: 'old',
          log: 'success',
          id: response.id,
        };
        res.send(result);
      } else {
        url.save()
          .then((cache) => {
            addToJobList(cache.id, cache.url, res);
          })
          .catch((err) => {
            res.send({ id: null, status: 'error', log: err });
          });
      }
    })
    .catch((error) => {
      res.send({ id: null, status: 'error', log: error });
    });
};

