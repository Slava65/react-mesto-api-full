export default function PopupWithForm({
  name,
  isOpen,
  title,
  children,
  onClose,
  onSubmit,
  buttonText
}) {
  return (
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <form
        className={`popup__container popup__container_${name}`}
        name="popup-place__container"
        onSubmit={onSubmit}
        noValidate
      >
        <h2 className="popup__title">{title}</h2>
        {children}
        <button
          type="button"
          className="popup__close popup__close_place"
          aria-label="Закрыть Окно"
          onClick={onClose}
        ></button>
        <button
          type="submit"
          className="popup__save popup__save_place"
          aria-label="Создать"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
