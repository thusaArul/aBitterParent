import React, { Component } from 'react';
import ApiCalls from './ApiCalls.js'
import './index.scss';

class App extends Component {


  render() {
    return (
      <div className="app">
        <h1>A Bitter Parent</h1>

        <ApiCalls />

      </div>
    )
  }
}



  export default App;
