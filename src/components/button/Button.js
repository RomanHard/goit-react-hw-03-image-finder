import React from 'react';
import './Button-module.css';

const Button = ({ onClick, disabled }) => {
  return (
    <button
      type="button"
      className="Button"
      onClick={onClick}
      disabled={disabled}
    >
      Load more
    </button>
  );
};

export default Button;
