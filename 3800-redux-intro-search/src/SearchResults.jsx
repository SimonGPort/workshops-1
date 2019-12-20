import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import items from './data.js';

class UnconnectedSearchResults extends Component {
  render = () => {
    const searchTags = this.props.tags === '' ? [] : this.props.tags.split(' ');

    let results = items.filter(item => {
      return (
        item.name.includes(this.props.query) &&
        item.price >= this.props.min &&
        item.price <= this.props.max &&
        (this.props.showOnlyInStock ? item.inStock : true) &&
        (searchTags.length > 0
          ? item.tags.some(tag => searchTags.includes(tag))
          : true)
      );
    });
    return (
      <div>
        {results.map((r, idx) => {
          return (
            <div key={`result-${idx}`}>
              <Link to={`/item/${r.id}`}>{r.name}</Link>
            </div>
          );
        })}
      </div>
    );
  };
}
let mapStateToProps = st => {
  return {
    query: st.searchQuery,
    min: st.min,
    max: st.max,
    showOnlyInStock: st.showOnlyInStock,
    tags: st.tags
  };
};
let SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);
export default SearchResults;
