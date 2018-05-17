const { CronJob } = require('cron');
require('../db/dbConnection');

const { workerTasks } = require('./workerHelpers');


const worker = new CronJob('*/15 * * * * *', () => {
  console.log('Worker is running now (runs every 15 seconds)!', new Date());
  workerTasks();
}, null, true, 'America/Los_Angeles');
