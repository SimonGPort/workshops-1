import React, { Component } from 'react';
import { connect } from 'react-redux';

class UnconnectedChatMessages extends Component {
  componentDidMount() {
    this.messageInterval = setInterval(this.updateMessages, 500);
  }

  componentWillUnmount() {
    clearInterval(this.messageInterval);
  }

  updateMessages = async () => {
    let response = await fetch('/messages?roomName=' + this.props.currentRoom);
    let responseBody = await response.text();
    // console.log('response from messages', responseBody);
    let parsed = JSON.parse(responseBody);
    // console.log('parsed', parsed);
    if (!parsed.success) {
      this.props.dispatch({ type: 'logout' });
      return;
    }
    this.props.dispatch({
      type: 'set-messages',
      messages: parsed.messages,
      directMessages: parsed.directMessages
    });
  };
  render = () => {
    let msgToElement = msg => (
      <li className="chat-msg">
        {msg.username}: {msg.message}{' '}
        <span className="timestamp">
          {new Date(msg.timestamp).toLocaleTimeString()}
        </span>
        {msg.img && <img src={msg.img} />}
      </li>
    );
    let activeUsers = this.props.messages
      .filter(
        message =>
          Date.now() - message.timestamp <= 3000 &&
          message.username !== 'System'
      )
      .reduce((acc, message) => {
        acc[message.username] = message.username;
        return acc;
      }, {});
    return (
      <div>
        <div className="chatroom">
          <div>
            <h3>Active users</h3>
            <ul>
              {Object.values(activeUsers).map(user => (
                <li>{user}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Messages</h3>
            <ul>{this.props.messages.map(msgToElement)}</ul>
          </div>
        </div>
        <div>
          <h1>Direct messages</h1>
          <ul>{this.props.directMessages.map(msgToElement)}</ul>
        </div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    currentRoom: state.currentRoom,
    messages: state.chatRooms[state.currentRoom].messages,
    directMessages: state.directMessages
  };
};
let Chat = connect(mapStateToProps)(UnconnectedChatMessages);
export default Chat;
