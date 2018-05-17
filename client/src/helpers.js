import axios from 'axios';

const getJobStatus = (jobID, callback) => {
  axios.get(`/api/${jobID}/status`)
    .then((res) => {
      console.log("res in helpers: ", res);
      callback(res);
    });
};

const postURLtoDB = (url, callback) => {
  axios.post(`/api/${url}/post`)
    .then((res) => {
      console.log("res in helpers: ", res);
      callback(res);
    });
};

export { postURLtoDB, getJobStatus };
