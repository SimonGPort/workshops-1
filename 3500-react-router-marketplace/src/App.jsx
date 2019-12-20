import './App.css';
import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import Seller from './Seller.jsx';
import Item from './Item.jsx';
import Details from './Details.jsx';
import Reviewer from './Reviewer.jsx';
import Cart from './Cart.jsx';
import Checkout from './Checkout.jsx';
import Profile from './Profile.jsx';
import SellPage from './SellPage.jsx';
import Navbar from './Navbar.jsx';
import { initialItems, initialSellers, initialReviewers } from './Data.js';

const renderAllSellers = () => {
  return (
    <div>
      <h3>Sellers list</h3>
      <ul>
        {initialSellers.map(seller => (
          <li>
            <Link to={'/seller/' + seller.id}>{seller.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
const renderReviewer = routerData => {
  const reviewerId = routerData.match.params.reviewerId;
  const reviewer = initialReviewers.find(reviewer => {
    return reviewer.id === reviewerId;
  });
  if (reviewer === undefined) return <div>No reviewer found</div>;
  return <Reviewer reviewer={reviewer} />;
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { items: initialItems, cart: [], itemsBought: [] };
  }
  addToCart = item => {
    this.setState({ cart: this.state.cart.concat(item) });
  };
  clearCart = () => {
    this.setState({ cart: [] });
  };
  decreaseInventory = (_, idx) => {
    const itemsCopy = this.state.items.slice();
    itemsCopy[idx] = {
      ...itemsCopy[idx],
      inventory: itemsCopy[idx].inventory - 1
    };
    this.setState({ items: itemsCopy });
  };
  removeItem = idx => {
    const cartCopy = this.state.cart.slice();
    cartCopy.splice(idx, 1);
    this.setState({ cart: cartCopy });
  };
  addItemsBought = items => {
    this.setState({ itemsBought: this.state.itemsBought.concat(items) });
  };
  addItem = item => {
    this.setState({ items: this.state.items.concat(item) });
  };
  renderItemDetails = routerData => {
    const itemId = routerData.match.params.itemId;
    const item = this.state.items.find(item => {
      return item.id === itemId;
    });
    if (item === undefined) return <div>No item found</div>;
    return <Details item={item} addToCart={this.addToCart} />;
  };
  renderSeller = routerData => {
    const sellerId = routerData.match.params.sid;
    const seller = initialSellers.find(seller => {
      return seller.id === sellerId;
    });
    return <Seller seller={seller} items={this.state.items} />;
  };
  renderAllItems = () => {
    return (
      <div>
        <Link to="/allSellers">See all sellers</Link>
        {this.state.items.map(item => (
          <Item item={item} />
        ))}
      </div>
    );
  };
  renderCart = () => {
    return <Cart cart={this.state.cart} removeItem={this.removeItem} />;
  };
  renderCheckout = routerData => {
    return (
      <Checkout
        cart={this.state.cart}
        clearCart={this.clearCart}
        addItemsBought={this.addItemsBought}
        decreaseInventory={this.decreaseInventory}
        history={routerData.history}
      />
    );
  };
  renderProfile = () => {
    return <Profile itemsBought={this.state.itemsBought} />;
  };
  renderSellPage = routerData => {
    return <SellPage addItem={this.addItem} history={routerData.history} />;
  };
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar cartSize={this.state.cart.length} />
          <Route exact={true} path="/" render={this.renderAllItems} />
          <Route exact={true} path="/allSellers" render={renderAllSellers} />
          <Route exact={true} path="/cart" render={this.renderCart} />
          <Route exact={true} path="/checkout" render={this.renderCheckout} />
          <Route exact={true} path="/profile" render={this.renderProfile} />
          <Route exact={true} path="/sell" render={this.renderSellPage} />
          <Route exact={true} path="/seller/:sid" render={this.renderSeller} />
          <Route
            exact={true}
            path="/item/:itemId"
            render={this.renderItemDetails}
          />
          <Route
            exact={true}
            path="/reviewer/:reviewerId"
            render={renderReviewer}
          />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
