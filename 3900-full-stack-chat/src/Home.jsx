import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { roomName: '' };
  }
  componentDidMount() {
    this.chatRoomInterval = setInterval(this.updateChatRooms, 500);
  }
  updateChatRooms = async () => {
    const response = await fetch('/chatrooms');
    const body = await response.text();
    const parsed = JSON.parse(body);
    if (parsed.success) {
      this.props.dispatch({
        type: 'set-chat-rooms',
        chatRooms: parsed.chatRooms
      });
    }
  };
  handleJoinRoom = async chatRoom => {
    const formData = new FormData();
    formData.append('roomName', chatRoom.name);
    const response = await fetch('/join', { method: 'POST', body: formData });
    const body = await response.text();
    const parsed = JSON.parse(body);
    if (parsed.success) {
      this.props.dispatch({ type: 'join-room', roomName: chatRoom.name });
    }
  };
  handleCreateRoom = async evt => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('roomName', this.state.roomName);
    const response = await fetch('/create-room', {
      method: 'POST',
      body: formData
    });
    const body = await response.text();
    const parsed = JSON.parse(body);
    if (parsed.success) {
      this.props.dispatch({
        type: 'create-room',
        chatRoom: parsed.chatRoom
      });
    }
  };
  handleRoomNameChange = evt => {
    this.setState({ roomName: evt.target.value });
  };
  render = () => {
    return (
      <div>
        <ul>
          {Object.values(this.props.chatRooms).map(chatRoom => (
            <li>
              <button onClick={() => this.handleJoinRoom(chatRoom)}>
                Select room {chatRoom.name}
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={this.handleCreateRoom}>
          <div>
            <label>
              Room name
              <input
                type="text"
                onChange={this.handleRoomNameChange}
                value={this.state.roomName}
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
  chatRooms: state.chatRooms
});

export default connect(mapStateToProps)(Home);
