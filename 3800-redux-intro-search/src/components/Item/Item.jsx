import React, { Component } from 'react';
import copy from 'copy-to-clipboard';
import items from '../../data.js';

class Item extends Component {
  handleShare = () => {
    copy(window.location.href);
    alert('Link copied to clipboard');
  };
  render = () => {
    const item = items.find(item => item.id === this.props.itemId);
    return (
      <div>
        <h1>{item.name}</h1>
        <img className="item-img" src={item.img} />
        <p>{item.description}</p>
        <ul>
          <li>Price: {item.price}</li>
          <li>In stock: {`${item.inStock}`}</li>
        </ul>
        <button onClick={this.handleShare}>Share</button>
      </div>
    );
  };
}
export default Item;
