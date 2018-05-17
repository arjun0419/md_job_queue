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
      html: null,
      url: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { jobID } = this.state;
    getJobStatus(jobID, (response) => {
      console.log(response.data);
      this.setState({ url: response.data[0].url });
      if (response.data[0].status === 'pending') {
        this.setState({ jobStatus: response.data[0].status });
      } else if (response.data[0].status === 'complete') {
        this.setState({ jobStatus: response.data[0].status });
        this.setState({ html: response.data[0].html });
      }
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
