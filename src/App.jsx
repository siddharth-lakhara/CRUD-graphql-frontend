import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    userName: '',
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Full Stack Graphql Example</h1>
        </header>
        <div className="App-body">
          I'm here
        </div>
      </div>
    );
  }
}

export default App;
