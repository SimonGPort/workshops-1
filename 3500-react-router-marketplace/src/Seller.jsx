import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Seller extends Component {
  render() {
    const { id, name, rating } = this.props.seller;
    return (
      <div className="card center">
        <div>{name}</div>
        <div>{rating}</div>
        <h3>Items for sale:</h3>
        <ul>
          {this.props.items
            .filter(item => item.sellerId === id)
            .map(item => (
              <li>
                <Link to={'/item/' + item.id}>{item.description}</Link>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
export default Seller;
