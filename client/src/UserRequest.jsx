import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import CacheURL from './CacheURL/CacheURL';
import CheckStatus from './CheckStatus/CheckStatus';

class UserRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestType: props.clicked,
    };
  }

  render() {
    let view = '';
    if (this.state.requestType === 'url') {
      view = <CacheURL />;
    } else if (this.state.requestType === 'status') {
      view = <CheckStatus />;
    }

    return (
      <Fragment>
        {view}
      </Fragment>
    );
  }
}

export default UserRequest;

UserRequest.propTypes = {
  clicked: PropTypes.string.isRequired,
};
