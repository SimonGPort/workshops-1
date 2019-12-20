import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Item extends Component {
  render() {
    const { image, price, description, sellerId, id } = this.props.item;
    return (
      <div className="card center">
        <img height="100px" src={image} />
        <div>
          <div>{description}</div>
          <div>{price}</div>
          <div>
            <Link to={'/seller/' + sellerId}> Link to seller </Link>
          </div>
          <div>
            <Link to={'/item/' + id}> Link to item </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Item;
