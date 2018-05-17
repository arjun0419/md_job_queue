import React, { Fragment } from 'react';

import { getJobStatus } from '../helpers';
import CheckStatusInput from './CheckStatusInput';
import DisplayStatus from './DisplayStatus';

class CheckStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobID: '',
      jobStatus: '',
      url: '',
      html: '',
      showCache: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCacheClick = this.handleCacheClick.bind(this);
  }

  handleSubmit() {
    if (this.state.jobID !== '') {
      const { jobID } = this.state;
      getJobStatus(jobID, (response) => {
        this.setState({
          jobID: response.data.jobId,
          url: response.data.url,
          jobStatus: response.data.status,
          html: response.data.html,
        });
      });
    }
  }

  handleCacheClick() {
    this.setState({ showCache: true });
  }

  handleInputChange(e) {
    this.setState({ jobID: e.target.value });
  }

  render() {
    const view = (this.state.jobStatus === '') ? (
      <CheckStatusInput
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
      />) : (
        <DisplayStatus
          jobStatus={this.state.jobStatus}
          url={this.state.url}
          html={this.state.html}
          showCache={this.state.showCache}
          handleCacheClick={this.handleCacheClick}
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

