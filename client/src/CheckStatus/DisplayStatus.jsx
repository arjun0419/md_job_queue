import React from 'react';
import PropTypes from 'prop-types';

const DisplayStatus = ({ jobStatus, url }) => {
  let view = (
    <div className="flex-centered-column">
      <h1>Satus: { jobStatus } </h1>
      <h3>Please come back in a few mins.</h3>
    </div>
  );

  if (jobStatus === 'complete') {
    view = (
      <div>
        <div className="flex-centered-column">
          <h3>Cache Status</h3>
          <h1>{url}: { jobStatus } </h1>
          <a href="/cache"><button className="greenButton"> See Cached Site </button></a>
        </div>
      </div>
    );
  } else if (jobStatus === 'Not Found') {
    view = (
      <div className="flex-centered-column">
        <h1>Satus: { jobStatus } </h1>
        <h3>Please verify this Job ID. This appears to be incorrect.</h3>
      </div>
    );
  }

  return view;
};

export default DisplayStatus;

DisplayStatus.propTypes = {
  jobStatus: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
