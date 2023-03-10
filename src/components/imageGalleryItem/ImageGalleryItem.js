import './ImageGalleryItem-module.css';

const GalleryItem = ({ imageUrl, alt }) => {
  return (
    <li className="gallery-item">
      <img src={imageUrl} alt={alt} className="gallery-item-image" />
    </li>
  );
};

export default GalleryItem;
