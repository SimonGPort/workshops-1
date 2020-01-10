import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChatForm extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '', img: null, directMessage: '', recipient: '' };
  }
  handleMessageChange = event => {
    console.log('new message', event.target.value);
    this.setState({ message: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    console.log('form submitted');
    let data = new FormData();
    data.append('msg', this.state.message);
    data.append('img', this.state.img);
    data.append('roomName', this.props.currentRoom);
    fetch('/newmessage', {
      method: 'POST',
      body: data
    });
  };
  handleClearMessages = async () => {
    const response = await fetch('/clear', { method: 'POST' });
    const body = await response.text();
    const parsed = JSON.parse(body);
    if (parsed.success) alert('Messages cleared!');
  };
  handleFileChange = evt => {
    this.setState({ img: evt.target.files[0] });
  };
  handleKick = async () => {
    const username = window.prompt('who do you want to kick?');
    const formData = new FormData();
    formData.append('username', username);
    const response = await fetch('/kick', { method: 'POST', body: formData });
    const body = await response.text();
    const parsed = JSON.parse(body);
    if (parsed.success) alert('Kicked successfully');
  };
  handleDirectMessageChange = evt => {
    this.setState({ directMessage: evt.target.value });
  };
  handleDirectMessageRecipientChange = evt => {
    this.setState({ recipient: evt.target.value });
  };
  handleDirectMessageSubmit = async evt => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('recipient', this.state.recipient);
    formData.append('message', this.state.directMessage);
    const response = await fetch('/direct-message', {
      method: 'POST',
      body: formData
    });
    const body = await response.text();
    const parsed = JSON.parse(body);
    if (parsed.success) alert('Message sent!');
    this.setState({ directMessage: '', recipient: '' });
  };
  render = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleMessageChange} type="text" />
          <input onChange={this.handleFileChange} type="file" />
          <input type="submit" />
        </form>
        <button onClick={this.handleClearMessages}>Clear messages</button>
        {this.props.username === 'admin' && (
          <button onClick={this.handleKick}>Kick user</button>
        )}
        <h1>Direct messages</h1>
        <form onSubmit={this.handleDirectMessageSubmit}>
          <div>
            <label>
              Message
              <input
                onChange={this.handleDirectMessageChange}
                value={this.state.directMessage}
                type="text"
              />
            </label>
          </div>
          <div>
            <label>
              Recipient
              <input
                onChange={this.handleDirectMessageRecipientChange}
                value={this.state.recipient}
                type="text"
              />
            </label>
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  username: state.username,
  currentRoom: state.currentRoom
});

export default connect(mapStateToProps)(ChatForm);
