import React from 'react';
import Searchbar from './searchbar/Searchbar';

function App() {
  const handleSubmit = value => {
    console.log(value);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
