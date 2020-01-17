import React, { Component } from 'react';
class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      file: '',
      description: ''
    };
  }
  descChangeHandler = e => {
    this.setState({ description: e.target.value });
  };
  imgFileChangeHandler = e => {
    this.setState({ imgFile: e.target.files[0] });
  };
  audioFileChangeHandler = e => {
    this.setState({ audioFile: e.target.files[0] });
  };
  submitHandler = evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append('img', this.state.imgFile);
    data.append('audio', this.state.audioFile);
    data.append('description', this.state.description);
    data.append('username', this.props.username);
    fetch('/new-post', { method: 'POST', body: data });
  };
  render = () => {
    return (
      <form onSubmit={this.submitHandler}>
        <label>
          Upload image{' '}
          <input type="file" onChange={this.imgFileChangeHandler} />
        </label>
        <label>
          Upload audio{' '}
          <input type="file" onChange={this.audioFileChangeHandler} />
        </label>
        <input
          type="text"
          value={this.state.description}
          onChange={this.descChangeHandler}
        />
        <input type="submit" value="create new" />
      </form>
    );
  };
}
export default NewPost;
