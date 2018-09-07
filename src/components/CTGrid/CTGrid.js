import React, { Component } from 'react';
import CTCard from '../../containers/CTCard/CTCard';

class CTGrid extends Component {
  render (){
    return (
      <div>
        <div className="dt dt--fixed">
          <div id="anchor" className="dtc tc pv4 pa2 ">
            <CTCard  />
            <br />
            </div>
          </div>
          <div className="dt dt--fixed">
            <div id="comp1" className="dtc pa2 ">
            <h1>Reference A</h1>
              <CTCard  />
              <button className="f6 link dim ph3 pv2 mb2 dib white bg-dark-blue" href="">Choose A</button>
            </div>
            <div id="comp2" className="dtc pa2 ">
              <h1> Reference b:</h1>
              <CTCard  />
              <button className="f6 link dim ph3 pv2 mb2 dib white bg-dark-blue" href="">Choose B</button>
            </div>
          </div>
        </div>
    )
  }
}


export default CTGrid;
