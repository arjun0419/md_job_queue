import React from 'react';
import PropTypes from 'prop-types';

const DisplayJobID = ({ jobID, url, status }) => {
  let view = (
    <div className="flex-centered-column">
      <h3>
        Thank yor for submitting {url}.
      </h3>
      <h3>
        Please check the status for { jobID }.
      </h3>
    </div>
  );

  if (status === 'old') {
    view = (
      <div className="flex-centered-column">
        <h3>
          {url} is already in our databse.
        </h3>
        <h3>
          Please check the status for { jobID }.
        </h3>
      </div>
    );
  } else if (status === 'error') {
    view = (
      <div className="flex-centered-column">
        <h3>
          There was an error. Please try again!
        </h3>

      </div>
    );
  }

  return view;
};

export default DisplayJobID;

DisplayJobID.propTypes = {
  jobID: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
