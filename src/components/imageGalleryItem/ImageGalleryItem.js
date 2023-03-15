import './ImageGalleryItem-module.css';

const GalleryItem = ({ webformatURL, alt, largeImageURL, onClick }) => {
  return (
    <li className="gallery-item">
      <img
        src={webformatURL}
        alt={alt}
        className="gallery-item-image"
        onClick={() => onClick(largeImageURL)}
      />
    </li>
  );
};

export default GalleryItem;
