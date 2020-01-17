import React, { Component } from 'react';
import Content from './Content.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: undefined
    };
  }
  setUsername = username => {
    this.setState({ username });
  };
  render = () => {
    if (this.state.username === undefined) {
      return (
        <>
          <Login setUsername={this.setUsername} />
          <Signup setUsername={this.setUsername} />
        </>
      );
    }
    return <Content username={this.state.username} />;
  };
}

export default App;
