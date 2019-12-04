import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { items, sellers } from "./data.js";

let renderRoot = () => {
  return (
    <div>
      Welcome to this page. Click here to view all the items:
      <Link to="/allItems">All items</Link>
    </div>
  );
};
let renderAllItems = () => {
  return (
    <div>
      {items.map(item => (
        <div>
          <div className="item-card">
            <div className="link-wrapper">
              <Link to={`/item/${item.id}`}>{item.description}</Link>
              <Link to={`/seller/${item.sellerId}`}>Go to seller</Link>
            </div>
            <img src={item.img} />
          </div>
        </div>
      ))}
    </div>
  );
};
let renderItem = routerData => {
  const item = items.find(item => item.id === routerData.match.params.itemId);
  if (item === undefined) return <div>Item not found</div>;
  return (
    <div className="item-wrapper">
      {item.description}. Only {item.inventory} remaining
      <div>
        <img src={item.img} />
      </div>
      <h3>Details</h3>
      <ul>
        <li>Price: {item.price}</li>
        <li>Color: {item.color}</li>
      </ul>
    </div>
  );
};
let renderSeller = routerData => {
  const sellerId = routerData.match.params.sellerId;
  const seller = sellers.find(seller => seller.id === sellerId);
  if (seller === undefined) return <div>Seller not found</div>;
  const sellerItems = items.filter(item => item.sellerId === seller.id);
  return (
    <div>
      <h3>Name: {seller.name}</h3>
      <p>{seller.description}</p>
      <h3>Items for sale:</h3>
      <ul>
        {sellerItems.map(item => (
          <li>
            <Link to={`/item/${item.id}`}>{item.description}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={renderRoot} />
          <Route exact={true} path="/allItems" render={renderAllItems} />
          <Route exact={true} path="/item/:itemId" render={renderItem} />
          <Route exact={true} path="/seller/:sellerId" render={renderSeller} />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
