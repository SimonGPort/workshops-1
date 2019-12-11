import React, { Component } from "react";
import { initialReviews } from "./Data.js";

class Reviewer extends Component {
  render() {
    const { id, name } = this.props.reviewer;
    return (
      <div className="card center ">
        <h3>Name: {name}</h3>
        <div>
          Reviews:
          <ul>
            {initialReviews
              .filter(review => review.reviewerId === id)
              .map(review => (
                <li>{review.content}</li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default Reviewer;
