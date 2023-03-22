import './Modal-module.css';

window.addEventListener('keydown', this.handleKeyDown);

const Modal = ({ largeImageURL, onClose }) => {
  return (
    <div className="Overlay" onClick={onClose}>
      <div className="Modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

export default Modal;
