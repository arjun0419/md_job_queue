import React, { Fragment } from 'react';

import Welcome from './Welcome';
import UserRequest from './UserRequest';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(type) {
    this.setState({ clicked: type });
  }

  render() {
    const view = this.state.clicked ?
      <UserRequest clicked={this.state.clicked} />
      :
      <Welcome handleClick={this.handleClick} />;
    return (
      <Fragment>
        {view}
      </Fragment>
    );
  }
}

export default App;
