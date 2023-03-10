import React, { Component } from 'react';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';

const API_KEY = '27264356-434762754b358cf0758f386e7';
const BASE_URL = 'https://pixabay.com/api/';

class App extends Component {
  state = {
    images: [],
  };

  handleSubmit = async query => {
    this.setState({ images: [] });

    const response = await fetch(
      `${BASE_URL}?q=${query}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    const data = await response.json();

    const images = data.hits.map(({ id, webformatURL, largeImageURL }) => ({
      id,
      webformatURL,
      largeImageURL,
    }));

    this.setState({ images });
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
      </div>
    );
  }
}

export default App;
