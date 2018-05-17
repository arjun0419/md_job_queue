import React from 'react';
import PropTypes from 'prop-types';

const CacheURLinput = ({ handleInputChange, handleSubmit }) => (
  <div className="flex-centered-column">
    <h3>Please enter the URL you would like us to add:</h3>
    <div>
      http://www.<input onChange={e => handleInputChange(e)} />
    </div>
    <button className="greenButton" onClick={() => handleSubmit()}> Submit</button>
  </div>
);

export default CacheURLinput;

CacheURLinput.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
