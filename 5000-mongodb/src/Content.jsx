import React, { Component } from 'react';
import Post from './Post.jsx';
import NewPost from './NewPost.jsx';
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  deletePost = id => {
    const postsCopy = this.state.posts.slice();
    postsCopy.splice(
      postsCopy.findIndex(post => post._id === id),
      1
    );
    this.setState({ posts: postsCopy });
  };
  reload = async () => {
    let response = await fetch('/all-posts');
    let body = await response.text();
    console.log('/all-posts response', body);
    body = JSON.parse(body);
    this.setState({ posts: body });
  };
  deletePosts = async () => {
    const formData = new FormData();
    formData.append('username', this.props.username);
    let response = await fetch('/delete-posts', {
      method: 'POST',
      body: formData
    });
    let body = await response.text();
    console.log('/delete-posts response', body);
    body = JSON.parse(body);
    if (body.success) {
      this.setState({ posts: body.posts });
    }
  };
  render = () => {
    return (
      <div>
        <button onClick={this.reload}> load </button>
        <div>
          {this.state.posts.map(p => (
            <Post
              key={p._id}
              contents={p}
              deletePost={this.deletePost}
              username={this.props.username}
            />
          ))}
        </div>
        <NewPost username={this.props.username} />
        <button onClick={this.deletePosts}>Delete posts</button>
      </div>
    );
  };
}
export default Content;
