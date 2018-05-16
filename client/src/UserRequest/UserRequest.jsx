import React, { Fragment } from 'react';

import CacheURL from './CacheURL/CacheURL';
import CheckStatus from './CheckStatus/CheckStatus';

class UserRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestType: props.clicked,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(type) {}

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
