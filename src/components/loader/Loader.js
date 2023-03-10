import React, { Component } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';

class Spinner extends Component {
  render() {
    return (
      <div>
        <CirclesWithBar
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={5000} //5 secs
        />
      </div>
    );
  }
}

export default Spinner;
