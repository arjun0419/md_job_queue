import React from 'react';
import PropTypes from 'prop-types';

import './Welcome.css';

const Welcome = ({ handleClick }) => (
  <div className="welcome">
    <h1>Welcome to URL Cacher!</h1>
    <div className="buttons">
      <button className="greenButton" onClick={() => handleClick('url')}>Sumbit A URL</button>
      <button className="greenButton" onClick={() => handleClick('status')}>Check Status</button>
    </div>
  </div>
);

export default Welcome;

Welcome.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
