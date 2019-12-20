import React, { Component } from 'react';

class SellPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      inventory: '',
      price: '',
      image: ''
    };
  }
  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
  };
  handleInventoryChange = event => {
    this.setState({ inventory: event.target.value });
  };
  handlePriceChange = event => {
    this.setState({ price: event.target.value });
  };
  handleImageChange = event => {
    this.setState({ image: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.addItem({
      ...this.state,
      reviewIds: [],
      id: `${Math.floor(Math.random() * 100000)}`,
      sellerId: 'ewio'
    });
    this.setState({
      description: '',
      inventory: '',
      price: '',
      image: ''
    });
    this.props.history.push('/');
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Description
            <input
              type="text"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
            />
          </label>
        </div>
        <div>
          <label>
            Inventory
            <input
              type="text"
              value={this.state.inventory}
              onChange={this.handleInventoryChange}
            />
          </label>
        </div>
        <div>
          <label>
            Price
            <input
              type="text"
              value={this.state.price}
              onChange={this.handlePriceChange}
            />
          </label>
        </div>
        <div>
          <label>
            Image
            <input
              type="text"
              value={this.state.image}
              onChange={this.handleImageChange}
            />
          </label>
        </div>
        <button>Submit</button>
      </form>
    );
  }
}
export default SellPage;
