import { connect } from 'react-redux';
import React, { Component } from 'react';

class MoreOptions extends Component {
  constructor(props) {
    super(props);
    this.state = { tagsInput: '' };
  }
  handleMinimumPrice = evt => {
    let price = parseInt(evt.target.value) || 0;
    this.props.dispatch({ type: 'minimum-price', price: price });
  };
  handleMaximumPrice = evt => {
    let price = parseInt(evt.target.value) || 0;
    this.props.dispatch({ type: 'maximum-price', price: price });
  };
  handleShowOnlyInStock = evt => {
    this.props.dispatch({
      type: 'set-show-only-in-stock',
      value: evt.target.checked
    });
  };
  handleClear = () => {
    this.props.dispatch({ type: 'clear' });
  };
  handleSearchTags = evt => {
    const input = evt.target.value;
    if (input.length > 1 && input.substr(-1) === ' ') {
      this.setState({ tagsInput: '' });
      this.props.dispatch({
        type: 'add-search-tag',
        tag: input.trim()
      });
    } else {
      this.setState({ tagsInput: input });
    }
  };
  handleRemoveTag = idx => {
    this.props.dispatch({ type: 'remove-search-tag', idx: idx });
  };
  render = () => {
    return (
      <>
        <div>
          Search tags
          <input
            type="text"
            onChange={this.handleSearchTags}
            value={this.state.tagsInput}
          />
          <div>
            {this.props.tags.map((tag, idx) => (
              <button
                key={`tag-${idx}`}
                className="tag"
                onClick={() => this.handleRemoveTag(idx)}
              >
                {tag} <span>x</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          Minimum price
          <input
            type="text"
            onChange={this.handleMinimumPrice}
            value={this.props.minPrice}
          />
        </div>
        <div>
          Maximum price
          <input
            type="text"
            onChange={this.handleMaximumPrice}
            value={this.props.maxPrice}
          />
        </div>
        <div>
          Show only in stock
          <input
            type="checkbox"
            onChange={this.handleShowOnlyInStock}
            checked={this.props.showOnlyInStock}
          />
        </div>
        <div>
          <button onClick={this.handleClear}>Clear</button>
        </div>
      </>
    );
  };
}
let mapStateToProps = st => {
  return {
    minPrice: st.min,
    maxPrice: st.max,
    showOnlyInStock: st.showOnlyInStock,
    tags: st.tags
  };
};
export default connect(mapStateToProps)(MoreOptions);
