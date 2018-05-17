import React from 'react';

const CacheURLinput = ({ handleInputChange, handleSubmit }) => (
  <div className="flex-centered-column">
    <h3>Please enter the URL you would like us to add:</h3>
    <input onChange={e => handleInputChange(e)} />
    <button className="greenButton" onClick={() => handleSubmit()}> Submit</button>
  </div>
);

export default CacheURLinput;
