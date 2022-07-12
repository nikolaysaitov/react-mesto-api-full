function PopupWithForm({
  name,
  title,
  id,
  formName,
  buttonText,
  children,
  onClose,
  isOpen,
  onSubmit,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_open" : " "}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_${name}`}
          id={id}
          autoComplete="off"
          name={formName}
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className="popup__button">
            {buttonText}
          </button>
        </form>
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
