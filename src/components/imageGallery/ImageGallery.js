import React from 'react';
import './ImageGallery-module.css';
import ImageGalleryItem from './imageGalleryItem/ImageGalleryItem.js';

const ImageGallery = ({ images }) => {
  return (
    <ul className="gallery">
      {images.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem key={id} src={webformatURL} alt={tags} />
      ))}
    </ul>
  );
};

export default ImageGallery;
