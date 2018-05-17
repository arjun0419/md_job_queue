import React, { Fragment } from 'react';

import { postURLtoDB } from '../helpers';
import CacheURLinput from './CacheURLinput';
import DisplayJobID from './DisplayJobID';

class CacheURL extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      jobID: null,
      status: null,
      log: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { url } = this.state;
    postURLtoDB(url, (response) => {
      this.setState({
        jobID: response.data.id,
        status: response.data.status,
        log: response.data.log,
      });
    });
  }

  handleInputChange(e) {
    this.setState({ url: e.target.value });
  }

  render() {
    const view = (this.state.jobID === null) ? (
      <CacheURLinput
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
      />) : (
        <DisplayJobID
          jobID={this.state.jobID}
          url={this.state.url}
          status={this.state.status}
        />
    );

    return (
      <Fragment>
        { view }
      </Fragment>
    );
  }
}

export default CacheURL;
