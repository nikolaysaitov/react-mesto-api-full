import React from 'react';

const ImagePopup = ({ selectedCard, onClose }) => {
  return (
    <div className={`popup popup_picture ${selectedCard.isOpened ? 'popup_open' : ''}`}>
      <div className="popup__picture-open">
        <img className="popup__photo" src={selectedCard.link} alt='Большая картинка' />
        <p className="popup__photo-title">{selectedCard.name}</p>
        <button
          type="button"
          className="popup__close popup__close_pic"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
