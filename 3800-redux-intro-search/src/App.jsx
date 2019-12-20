import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Search, Item } from './components';
import SearchResults from './SearchResults.jsx';

class App extends Component {
  renderItem = routeProps => {
    return <Item itemId={routeProps.match.params.itemId} />;
  };
  renderIndex = () => {
    return (
      <>
        <Search />
        <SearchResults />
      </>
    );
  };
  render = () => {
    return (
      <BrowserRouter>
        <Route exact path="/" render={this.renderIndex} />
        <Route path="/item/:itemId" render={this.renderItem} />
      </BrowserRouter>
    );
  };
}
export default App;
