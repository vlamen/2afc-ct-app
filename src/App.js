import React, { Component } from 'react';
import CTGrid from './components/CTGrid/CTGrid';
import  Particles  from 'react-particles-js';
import particleConfig from './particlesjs-config.json';
import './App.css';
import'tachyons';

const particleOptions = particleConfig;
class App extends Component {
  render() {
    return (
      <div
        className="App">
        <Particles className="particles"
                   params={particleOptions}/>
        <h1 className="tc">Reference Tumor:</h1>
        <CTGrid />
      </div>
    );
  }
}

export default App;
