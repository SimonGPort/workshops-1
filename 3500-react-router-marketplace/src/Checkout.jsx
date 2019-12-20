import React, { Component } from 'react';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: '',
      expirationDate: '',
      cvv: '',
      shippingAddress: ''
    };
  }
  // Generic update method
  // handleInputChange = (event, key) => {
  //   this.setState({ [key]: event.target.value });
  // };
  handleCardNumber = event => {
    let input = event.target.value;
    // if (input !== "" && isNaN(Number(input))) return;
    // if (input.length >= 3) input = `(${input.substring(0, 3)}) ${input.substring(3)}`;
    this.setState({ cardNumber: input });
  };
  handleExpirationDate = event => {
    this.setState({ expirationDate: event.target.value });
  };
  handleCvv = event => {
    this.setState({ cvv: event.target.value });
  };
  handleShippingAddress = event => {
    this.setState({ shippingAddress: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    alert(
      `${this.state.cardNumber} - ${this.state.expirationDate} - ${this.state.cvv} - ${this.state.shippingAddress}`
    );
    this.setState({
      cardNumber: '',
      expirationDate: '',
      cvv: '',
      shippingAddress: ''
    });
    this.props.cart.forEach(this.props.decreaseInventory);
    this.props.addItemsBought(this.props.cart);
    this.props.clearCart();
    this.props.history.push('/');
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Card number
            <input
              type="text"
              value={this.state.cardNumber}
              onChange={this.handleCardNumber}
            />
          </label>
        </div>
        <div>
          <label>
            Expiration date
            <input
              type="text"
              value={this.state.expirationDate}
              onChange={this.handleExpirationDate}
            />
          </label>
        </div>
        <div>
          <label>
            CVV
            <input
              type="text"
              value={this.state.cvv}
              onChange={this.handleCvv}
            />
          </label>
        </div>
        <div>
          <label>
            Shipping address
            <input
              type="text"
              value={this.state.shippingAddress}
              onChange={this.handleShippingAddress}
            />
          </label>
        </div>
        <button>Submit</button>
      </form>
    );
  }
}
export default Checkout;
