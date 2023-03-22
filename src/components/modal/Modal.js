import React, { Component } from 'react';
import './Modal-module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  handleCloseModal = event => {
    if (event && event.target && event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { largeImageURL } = this.props;

    return (
      <div className="Overlay" onClick={this.handleCloseModal}>
        <div className="Modal">
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
