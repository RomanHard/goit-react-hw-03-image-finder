import React, { Component } from 'react';
import './Modal-module.css';

class Modal extends Component {
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { largeImageURL, onClose } = this.props;

    return (
      <div className="Overlay" onClick={onClose}>
        <div className="Modal">
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
