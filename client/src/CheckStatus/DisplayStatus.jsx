import React from 'react';

const DisplayStatus = ({ jobStatus, url }) => {
  let view = (
    <div className="flex-centered-column">
      <h1>Satus for {url}: { jobStatus } </h1>
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
  }

  return view;
};

export default DisplayStatus;
