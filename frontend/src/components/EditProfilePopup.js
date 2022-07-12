import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleJobChange(e) {
    setDescription(e.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser( name, description );
  }

  return (
    <PopupWithForm
      name="formEdit"
      isOpen={isOpen}
      title="Редактировать профиль"
      formName="formEdit"
      buttonText="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="name-input"
        name="name"
        className="popup__input popup__input-name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={name || 'Имя'}
        onChange={handleNameChange}
      />
      <span className="name-input-error popup__error"></span>
      <input
        type="text"
        id="job-input"
        name="job"
        className="popup__input popup__input-job"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        value={description || 'Профессия'}
        onChange={handleJobChange}
      />
      <span className="job-input-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
