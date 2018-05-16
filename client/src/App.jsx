import React, {Fragment} from 'react';

// import Header from './Header';
import Welcome from './welcome';
import UserRequest from './UserRequest/UserRequest';
// import Footer from './Footer';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(type) {
    console.log(type);
    this.setState({ clicked: type });
  }

  render() {
    const view = this.state.clicked ? <UserRequest clicked={this.state.clicked}/> : <Welcome handleClick={this.handleClick} />;
    return (
      <Fragment>
        {view}
      </Fragment>
    );
  }
}

export default App;