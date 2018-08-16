import React, { Component } from 'react';
import QueryActions from '../QueryActions';

import './App.css';

class App extends Component {
  state = {
    results: ['ssample', 'results'],
  };

  fetchResults = (node) => {
    this.setState({
      results: node,
    });
  }

  render() {
    const { results } = this.state;
    const { fetchResults } = this;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Full Stack Graphql Example</h1>
          <h2 className="App-title">CRUD Example using Graphql</h2>
        </header>
        <div className="App-body">
          <QueryActions fetchResults={fetchResults} />
          <div className="query-results">
            {results}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
