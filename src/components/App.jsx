import React, { Component } from 'react';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';

const API_KEY = '27264356-434762754b358cf0758f386e7';
const BASE_URL = 'https://pixabay.com/api/';
class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    currentPage: 1,
    isLoadMoreButtonVisible: false,
  };

  handleSubmit = async query => {
    this.setState({
      searchQuery: query,
      images: [],
      currentPage: 1,
      isLoadMoreButtonVisible: false,
    });

    await this.fetchImages();
  };

  handleLoadMoreClick = async () => {
    await this.fetchImages(this.state.currentPage + 1); // використовуємо this.state.currentPage
  };

  fetchImages = async newPage => {
    const { searchQuery } = this.state;
    this.setState({ isLoading: true });

    try {
      const response = await fetch(
        `${BASE_URL}?q=${searchQuery}&page=${newPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();

      const images = data.hits.map(({ id, webformatURL, largeImageURL }) => ({
        id,
        webformatURL,
        largeImageURL,
      }));

      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        currentPage: newPage, // оновлюємо значення currentPage
        isLoadMoreButtonVisible: images.length === 12,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoadMoreButtonVisible } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} onClick={this.handleOpenModal} />
        {isLoadMoreButtonVisible && images.length > 0 && (
          <Button onClick={this.handleLoadMoreClick} disabled={false} />
        )}
      </div>
    );
  }
}

export default App;
