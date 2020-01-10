import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Home from './Home.jsx';
import ChatMessages from './ChatMessages.jsx';
import ChatForm from './ChatForm.jsx';

class UnconnectedApp extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }
  componentDidMount() {
    this.fetchSession();
  }
  fetchSession = async () => {
    this.setState({ loading: true });
    const response = await fetch('/session');
    const body = await response.text();
    const parsed = JSON.parse(body);
    if (parsed.success) {
      this.props.dispatch({ type: 'login-success', username: parsed.username });
    }
    this.setState({ loading: false });
  };
  handleLogout = async () => {
    const response = await fetch('/logout', { method: 'POST' });
    const body = await response.text();
    const parsed = JSON.parse(body);
    if (parsed.success) this.props.dispatch({ type: 'logout' });
  };
  render = () => {
    if (this.state.loading) return null;
    if (this.props.lgin) {
      return (
        <div>
          <div>
            <button onClick={this.handleLogout}>Logout</button>
          </div>
          {this.props.currentRoom === '' ? (
            <Home />
          ) : (
            <>
              <ChatMessages />
              <ChatForm />
            </>
          )}
        </div>
      );
    }
    return (
      <div>
        <h1>Signup</h1>
        <Signup />
        <h1>Login</h1>
        <Login />
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { lgin: state.loggedIn, currentRoom: state.currentRoom };
};
let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
