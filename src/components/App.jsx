import React, { Component } from 'react';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import Spinner from './loader/Loader';
import Modal from './modal/Modal';
import { fetchImages } from './api/Api';

class App extends Component {
  state = {
    searchQuery: '',
    images: null,
    currentPage: 1,
    isLoadMoreButtonVisible: false,
    isLoading: false,
    totalHits: null,
    largeImageURL: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      (prevState.currentPage !== this.state.currentPage &&
        this.state.images.length > 0)
    ) {
      this.fetchImages(this.state.currentPage);
    }
  }

  fetchImages = async page => {
    const { searchQuery } = this.state;
    this.setState({ isLoading: true });

    const { images, totalHits, isLoadMoreButtonVisible } = await fetchImages(
      searchQuery,
      page
    );

    this.setState({
      images: [...this.state.images, ...images] || images,
      currentPage: page,
      isLoadMoreButtonVisible,
      totalHits,
    });

    this.setState({ isLoading: false });
  };

  handleSubmit = query => {
    this.setState({
      searchQuery: query,
      images: [],
      currentPage: 1,
      isLoadMoreButtonVisible: false,
      isLoading: false,
      totalHits: null,
    });
  };

  handleLoadMoreClick = async () => {
    const { currentPage, images } = this.state;
    const nextPage = currentPage + 1;
    const { images: newImages, isLoadMoreButtonVisible } = await fetchImages(
      this.state.searchQuery,
      nextPage
    );

    this.setState({
      images: [...images, ...newImages],
      currentPage: nextPage,
      isLoadMoreButtonVisible,
    });
  };

  handleOpenModal = largeImageURL => {
    this.setState({ largeImageURL });
  };

  handleCloseModal = event => {
    if (event && event.target && event.target === event.currentTarget) {
      this.setState({ largeImageURL: null });
    }
  };

  render() {
    const { images, isLoadMoreButtonVisible, isLoading } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        {images !== null && (
          <ImageGallery images={images} onClick={this.handleOpenModal} />
        )}
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
