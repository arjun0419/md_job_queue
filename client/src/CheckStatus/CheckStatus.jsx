import React, { Fragment } from 'react';

import { getJobStatus } from '../helpers';
import CheckStatusInput from './CheckStatusInput';
import DisplayStatus from './DisplayStatus';

class CheckStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobID: '',
      jobStatus: null,
      url: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { jobID } = this.state;
    getJobStatus(jobID, (response) => {
      console.log(response);
      this.setState({
        jobID: response.data.jobId,
        url: response.data.url,
        jobStatus: response.data.status,
      });
    });
  }

  handleInputChange(e) {
    this.setState({ jobID: e.target.value });
  }

  render() {
    const view = (this.state.jobStatus === null) ? (
      <CheckStatusInput
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
      />) : (
        <DisplayStatus
          jobStatus={this.state.jobStatus}
          url={this.state.url}
        />
    );

    return (
      <Fragment>
        { view }
      </Fragment>
    );
  }
}

export default CheckStatus;

