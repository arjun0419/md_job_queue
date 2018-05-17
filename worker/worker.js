const { CronJob } = require('cron');
require('../db/dbConnection');

const { workerTasks } = require('./workerHelpers');


const worker = new CronJob('*/9 * * * * *', () => {
  workerTasks();
}, null, true, 'America/Los_Angeles');
