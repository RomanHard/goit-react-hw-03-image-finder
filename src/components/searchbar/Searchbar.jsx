import React, { useState } from 'react';
import './searchbar-module.css';

function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(inputValue);
  };

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

export default Searchbar;
