import React from 'react';
import PropTypes from 'prop-types';

const DisplayStatus = ({ jobStatus, url, html, showCache, handleCacheClick }) => {
  const divStyle = {
    height: '100%',
  };

  let view = (
    <div className="flex-centered-column">
      <h1>Satus: { jobStatus } </h1>
      <h3>Please come back in a few mins.</h3>
    </div>
  );

  if (jobStatus === 'complete' && showCache === false) {
    view = (
      <div className="flex-centered-column">
        <h3>Cache Status</h3>
        <h1>{url}: { jobStatus } </h1>
        <button className="greenButton" onClick={() => handleCacheClick()}> See Cached Site </button>
      </div>
    );
  } else if (jobStatus === 'Not Found') {
    view = (
      <div className="flex-centered-column">
        <h1>Satus: { jobStatus } </h1>
        <h3>Please verify this Job ID. This appears to be incorrect.</h3>
      </div>
    );
  } else if (showCache) {
    view = (
      <div style={divStyle}>
        {html}
      </div>
    );
  }

  return view;
};

export default DisplayStatus;

DisplayStatus.propTypes = {
  jobStatus: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
  showCache: PropTypes.bool.isRequired,
  handleCacheClick: PropTypes.func.isRequired,
};
