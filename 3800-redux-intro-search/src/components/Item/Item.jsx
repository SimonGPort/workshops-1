import React, { Component } from 'react';
import items from '../../data.js';

class Item extends Component {
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
      </div>
    );
  };
}
export default Item;
