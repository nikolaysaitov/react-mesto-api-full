import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace(name, link);
  }

  return (
    <PopupWithForm
      name="formAddCard"
      isOpen={isOpen}
      title="Новое место"
      formName="formAddCard"
      buttonText="Создать"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="card-input"
        name="card"
        className="popup__input popup__input_card-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={handleNameChange}
      />
      <span className="card-input-error popup__error"></span>
      <input
        type="url"
        id="url-input"
        name="link"
        className="popup__input popup__input-link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleLinkChange}
        value={link}
      />
      <span className="url-input-error popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
