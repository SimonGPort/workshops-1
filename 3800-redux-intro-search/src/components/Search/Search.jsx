import { connect } from 'react-redux';
import React, { Component } from 'react';
import { MoreOptions } from './components';

class UnconnectedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { moreOptions: false };
  }
  handleQuery = evt => {
    this.props.dispatch({ type: 'query', q: evt.target.value });
  };
  handleShowMoreOptions = () => {
    this.setState({ moreOptions: true });
  };
  render = () => {
    return (
      <div>
        <div>
          Search query
          <input
            type="text"
            onChange={this.handleQuery}
            value={this.props.query}
          />
        </div>
        {!this.state.moreOptions && (
          <div>
            <button onClick={this.handleShowMoreOptions}>
              Show more options
            </button>
          </div>
        )}
        {this.state.moreOptions && <MoreOptions />}
      </div>
    );
  };
}
let mapStateToProps = st => {
  return {
    query: st.searchQuery
  };
};
let Search = connect(mapStateToProps)(UnconnectedSearch);
export default Search;
