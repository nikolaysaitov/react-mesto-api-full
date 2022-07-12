import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="formAdd"
      isOpen={isOpen}
      title="Обновить автар"
      formName="formAdd"
      buttonText="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="urlAvatar-input"
        name="link"
        className="popup__input popup__input-avatar"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      />
      <span className="urlAvatar-input-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
