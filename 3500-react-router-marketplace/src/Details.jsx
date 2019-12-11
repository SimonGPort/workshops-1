import React, { Component } from "react";
import { Link } from "react-router-dom";
import { initialReviews } from "./Data.js";

class Details extends Component {
  addToCart = () => {
    this.props.addToCart(this.props.item);
  };
  render() {
    const {
      image,
      price,
      description,
      sellerId,
      id,
      inventory,
      reviewIds
    } = this.props.item;
    return (
      <div className="center">
        <img height="200px" src={image} />
        <div>
          <h3>About</h3>
          <p>{description}</p>
          <div>Cost: {price}</div>
          <div>Inventory: {inventory}</div>
          <ul>
            {reviewIds.map(reviewId => {
              const review = initialReviews.find(
                review => review.id === reviewId
              );
              return (
                <li>
                  {review.content} -{" "}
                  <Link to={"/reviewer/" + review.reviewerId}>
                    Go to reviewer
                  </Link>
                </li>
              );
            })}
          </ul>
          <div>
            <Link to={"/seller/" + sellerId}> Link to seller </Link>
          </div>
          <div className="center-text">
            <button className="btn" onClick={this.addToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Details;
