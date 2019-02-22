import React, { Component } from 'react';
import './App.css';
import Input from './helpers/input.js';
import ExpirationInput from './helpers/expirationInput.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Input />
          <ExpirationInput />
        </header>
      </div>
    );
  }
}

export default App;
