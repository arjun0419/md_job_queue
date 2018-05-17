const { CronJob } = require('cron');
require('../db/dbConnection');

const { fetchHTML, updateURLCache } = require('./workerHelpers');

const URLcache = require('../db/models/urlCache');
const JobList = require('../db/models/jobList');

const worker = new CronJob('1 */1 * * * *', () => {
  console.log("Worker is running now (runs every 1 minute)!", new Date());
  JobList.find({}, 'jobId url', (err, jobs) => {
    if (err) return console.log(err);
    if (jobs.length > 0) {
      console.log(`worker has ${jobs.length} jobs to complete`);
      jobs.forEach((job) => {
        const jobURL = job.url;
        const jobID = job.jobId;
        console.log('From for each => jobURL :', jobURL, 'jobID: ', jobID);
        fetchHTML(jobURL)
          .then((response) => {
            updateURLCache(jobID, response)
              .then(() => console.log('update completed!'));
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } else {
      console.log("No Jobs found for worker");
    }
  });
}, null, true, 'America/Los_Angeles');

// [ { _id: 5afc7f6d89ba931f00b38e1a,
//     jobId: '5afc7f6d89ba931f00b38e19',
//     url: 'www.yahoo.com' },
//   { _id: 5afc81b1d790031f345d2d27,
//     jobId: '5afc81b1d790031f345d2d26',
//     url: 'reddit.com' },
//   { _id: 5afc88d63e6e02203aea50f1,
//     jobId: '5afc88d53e6e02203aea50f0',
//     url: 'test' },
//   { _id: 5afc89947fc24d204de12acd,
//     jobId: '5afc89947fc24d204de12acc',
//     url: 'test2' },
//   { _id: 5afc8a3b9959fa20571443e4,
//     jobId: '5afc8a3b9959fa20571443e3',
//     url: 'test6' },
//   { _id: 5afc8a6ca95f9e2063f97d74,
//     jobId: '5afc8a6ca95f9e2063f97d73',
//     url: 'test6' },
//   { _id: 5afc8ef8d203af2191f219a6,
//     jobId: '5afc8ef7d203af2191f219a5',
//     url: 'love.com' },
//   { _id: 5afc8f2d950ee2219b38a424,
//     jobId: '5afc8f2c950ee2219b38a423',
//     url: '1.com' },
//   { _id: 5afc91784b250c223e0d136d,
//     jobId: '5afc91774b250c223e0d136c',
//     url: 'arjun' },
//   { _id: 5afc91a16304c422498e78f7,
//     jobId: '5afc91a06304c422498e78f6',
//     url: 'test19.com' },
//   { _id: 5afc91ef0b401422540c0396,
//     jobId: '5afc91ee0b401422540c0395',
//     url: 'hhhhhhh' },
//   { _id: 5afca2af55222323b319ab7f,
//     jobId: '5afca2ae55222323b319ab7e',
//     url: 'jeena.com' },
//   { _id: 5afca2e055222323b319ab83,
//     jobId: '5afca2e055222323b319ab82',
//     url: 'apple.com' },
//   { _id: 5afca39fb85eeb240aca6ea1,
//     jobId: '5afca39eb85eeb240aca6ea0',
//     url: '819191' },
//   { _id: 5afcaa69f346ac252c14efaa,
//     jobId: '5afcaa68f346ac252c14efa9',
//     url: '81919' } ]
