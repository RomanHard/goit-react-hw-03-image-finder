import './ImageGalleryItem-module.css';

const GalleryItem = ({ webformatURL, alt }) => {
  return (
    <li className="gallery-item">
      <img src={webformatURL} alt={alt} className="gallery-item-image" />
    </li>
  );
};

export default GalleryItem;
