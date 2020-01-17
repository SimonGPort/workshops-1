import React, { Component } from 'react';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      usernameInput: '',
      passwordInput: ''
    };
  }
  usernameChange = evt => {
    this.setState({ usernameInput: evt.target.value });
  };
  passwordChange = evt => {
    this.setState({ passwordInput: evt.target.value });
  };
  submitHandler = async evt => {
    evt.preventDefault();
    console.log('username', this.state.username);
    console.log('password', this.state.passwordInput);
    let name = this.state.usernameInput;
    let data = new FormData();
    data.append('username', name);
    data.append('password', this.state.passwordInput);
    let response = await fetch('/signup', { method: 'POST', body: data });
    let body = await response.text();
    console.log('/signup response', body);
    body = JSON.parse(body);
    if (body.success) {
      this.props.setUsername(name);
    }
  };
  render = () => {
    return (
      <>
        <form onSubmit={this.submitHandler}>
          Username
          <input type="text" onChange={this.usernameChange} /> Password{' '}
          <input type="text" onChange={this.passwordChange} />
          <input type="submit" value="signup" />
        </form>
      </>
    );
  };
}

export default Signup;
