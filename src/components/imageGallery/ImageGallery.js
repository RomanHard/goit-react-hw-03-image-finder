import React, { Component } from 'react';
import './ImageGallery-module.css';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    const { images, onClick } = this.props;

    return (
      <ul className="gallery">
        {images.map((image, index) => (
          <ImageGalleryItem
            key={`${image.webformatURL}-${index}`}
            webformatURL={image.webformatURL}
            onClick={() => onClick(image.largeImageURL)}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
