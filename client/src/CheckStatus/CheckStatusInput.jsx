import React from 'react';
import PropTypes from 'prop-types';

const CheckStatusInput = ({ handleInputChange, handleSubmit }) => (
  <div className="flex-centered-column">
    <h3>Please enter JOB ID to check status:</h3>
    <input onChange={e => handleInputChange(e)} />
    <button className="greenButton" onClick={() => handleSubmit()}> Submit</button>
  </div>
);

export default CheckStatusInput;

CheckStatusInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
