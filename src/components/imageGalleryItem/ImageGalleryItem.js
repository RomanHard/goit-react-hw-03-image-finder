import React from 'react';
import './ImageGalleryItem-module.css';

const GalleryItem = ({ imageUrl, alt }) => {
  return (
    <li className="gallery-item">
      <img src={imageUrl} alt={alt} />
    </li>
  );
};

export default GalleryItem;
