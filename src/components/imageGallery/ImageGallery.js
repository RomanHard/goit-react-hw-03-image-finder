import React, { Component } from 'react';
import './ImageGallery-module.css';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    const { images, onClick } = this.props;

    return (
      <ul className="gallery">
        {images.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClick={onClick}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
