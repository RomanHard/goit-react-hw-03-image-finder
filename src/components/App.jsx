import React, { Component } from 'react';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import Spinner from './loader/Loader';
import Modal from './modal/Modal';
import axios from 'axios';

import { fetchImages } from './api';

const API_KEY = '27264356-434762754b358cf0758f386e7';
axios.defaults.baseURL = 'https://pixabay.com/api/';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    currentPage: 1,
    isLoadMoreButtonVisible: false,
    isLoading: false,
    totalHits: null,
    largeImageURL: null,
  };

  async componentDidMount() {
    const { currentPage } = this.state;
    await this.fetchImages(currentPage);
  }

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, currentPage } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      await this.fetchImages(1);
    } else if (prevState.currentPage !== currentPage) {
      await this.fetchImages(currentPage);
    }
  }

  componentWillUnmount() {
    this.setState({
      searchQuery: '',
      images: [],
      currentPage: 1,
      isLoadMoreButtonVisible: false,
      isLoading: false,
      totalHits: null,
      largeImageURL: null,
    });
  }

  handleSubmit = query => {
    this.setState({
      searchQuery: query,
      images: [],
      currentPage: 1,
      isLoadMoreButtonVisible: false,
      isLoading: false,
    });
  };

  handleLoadMoreClick = async () => {
    const { currentPage } = this.state;
    this.setState({ currentPage: currentPage + 1 });
  };

  async fetchImages(page) {
    const { searchQuery, images } = this.state;
    this.setState({ isLoading: true });

    try {
      const data = await fetchImages(searchQuery, page);

      const newImages = data.hits.map(
        ({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        })
      );

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        totalHits: data.totalHits,
        isLoadMoreButtonVisible:
          images.length + newImages.length < data.totalHits,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleOpenModal = largeImageURL => {
    this.setState({ largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ largeImageURL: null });
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
        {this.state.largeImageURL && (
          <Modal
            largeImageURL={this.state.largeImageURL}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}

export default App;
