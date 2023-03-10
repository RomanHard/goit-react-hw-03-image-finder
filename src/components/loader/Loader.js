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
          timeout={3000} //3 secs
        />
      </div>
    );
  }
}

export default Spinner;
