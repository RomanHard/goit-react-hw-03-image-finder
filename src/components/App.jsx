import React, { Component } from 'react';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import Spinner from './loader/Loader';

const API_KEY = '27264356-434762754b358cf0758f386e7';
const BASE_URL = 'https://pixabay.com/api/';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    currentPage: 1,
    isLoadMoreButtonVisible: false,
    isLoading: false,
    totalHits: null,
  };

  handleSubmit = async query => {
    this.setState({
      searchQuery: query,
      images: [],
      currentPage: 1,
      isLoadMoreButtonVisible: false,
    });

    await this.fetchImages(1);
  };

  // handleOpenModal = e => { };

  handleLoadMoreClick = async () => {
    const { currentPage } = this.state;
    await this.fetchImages(currentPage + 1);
  };

  fetchImages = async page => {
    const { searchQuery, images } = this.state;
    this.setState({ isLoading: true });

    try {
      const response = await fetch(
        `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();

      const newImages = data.hits.map(
        ({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        })
      );

      this.setState(prevState => ({
        images: page === 1 ? newImages : [...prevState.images, ...newImages],
        currentPage: page,
        totalHits: data.totalHits,
        isLoadMoreButtonVisible:
          images.length + newImages.length < data.totalHits,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoadMoreButtonVisible, isLoading } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} onClick={this.handleOpenModal} />
        {isLoading && <Spinner />}
        {isLoadMoreButtonVisible && (
          <Button onClick={this.handleLoadMoreClick} disabled={isLoading} />
        )}
      </div>
    );
  }
}

export default App;
