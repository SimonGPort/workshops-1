import React, { Component } from 'react';
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.contents.description,
      imgFile: null
    };
  }
  // componentDidUpdate(prevProps) {
  //   if (this.props.contents !== prevProps.contents) {
  //     this.setState({ description: this.props.contents.description });
  //   }
  // }
  changeHandler = e => {
    this.setState({ description: e.target.value });
  };
  submitHandler = evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append('imgFile', this.state.imgFile);
    data.append('description', this.state.description);
    data.append('id', this.props.contents._id);
    fetch('/update', { method: 'POST', body: data });
  };
  handleDelete = async () => {
    const id = this.props.contents._id;
    const data = new FormData();
    data.append('id', id);
    const response = await fetch('/delete', { method: 'POST', body: data });
    const body = await response.text();
    const parsed = JSON.parse(body);
    if (parsed.success) {
      this.props.deletePost(id);
    }
  };
  handleImgFileChange = e => {
    const file = e.target.files[0];
    this.setState({ imgFile: file });
  };
  render = () => {
    const {
      username,
      description,
      frontendPath,
      soundPath
    } = this.props.contents;
    return (
      <form onSubmit={this.submitHandler}>
        <input
          type="text"
          value={this.state.description}
          onChange={this.changeHandler}
        />
        <input type="file" onChange={this.handleImgFileChange} />
        <div>
          {username} - {description}
        </div>
        <img src={frontendPath} />
        {soundPath && (
          <audio controls>
            <source src={soundPath} />
          </audio>
        )}
        {this.props.username === username && (
          <button onClick={this.handleDelete}>Delete</button>
        )}
        {this.props.username === username && (
          <input type="submit" value="update" />
        )}
      </form>
    );
  };
}
export default Post;
