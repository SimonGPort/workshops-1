import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Cart extends Component {
  handleRemove = idx => {
    this.props.removeItem(idx);
  };
  render() {
    return (
      <div className="card center">
        <h3>Your cart</h3>
        <ul>
          {this.props.cart.map((item, idx) => (
            <li>
              <Link to={'/item/' + item.id}>{item.description}</Link>
              <button onClick={() => this.handleRemove(idx)}>Remove</button>
            </li>
          ))}
        </ul>
        <div className="center-text">
          <Link to="/checkout" className="btn">
            Checkout
          </Link>
        </div>
      </div>
    );
  }
}
export default Cart;

// **********************
// The following code shows how to render the cart with a quantity next to each item (e.g. Great shoes! - 3)
// **********************
// render() {
//   const uniqueItems = this.props.cart.reduce(
//     (acc, currItem) =>
//       acc.some(item => item.id === currItem.id) ? acc : acc.concat(currItem),
//     []
//   );
//   return (
//     <div className="card center">
//       <h3>Your cart</h3>
//       {uniqueItems.length === 0 ? (
//         <div>No items</div>
//       ) : (
//         <>
//           <ul>
//             {uniqueItems.map((item, idx) => {
//               const quantity = this.props.cart.filter(
//                 cartItem => cartItem.id === item.id
//               ).length;
//               return (
//                 <li>
//                   <Link to={"/item/" + item.id}>{item.description}</Link>
//                   <span> - {quantity}</span>
//                   <button onClick={() => this.handleRemove(idx)}>
//                     Remove
//                   </button>
//                 </li>
//               );
//             })}
//           </ul>
//           <div className="center-text">
//             <button onClick={this.handleCheckout} className="btn">
//               Checkout
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
