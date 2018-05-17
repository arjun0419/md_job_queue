import React from 'react';

const DisplayStatus = ({ jobStatus, html, url }) => {
  let view = (
    <div className="flex-centered-column">
      <h1>Satus for {url}: { jobStatus } </h1>
      <h3>Please come back in a few mins.</h3>
    </div>
  );

  if (jobStatus === 'complete') {
    view = (
      <div className="flex-centered-column">
        <h1>Satus for {url}: { jobStatus } </h1>
        <h3>{ html }</h3>
      </div>
    );
  }
  return view;
};

export default DisplayStatus;
