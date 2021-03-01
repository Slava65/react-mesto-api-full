import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const linkAvatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(linkAvatar.current.value);
  }

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        id="avatar"
        type="url"
        ref={linkAvatar}
        className="popup__text popup__text_avatar"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
      />
      <span id="avatar-error" className="popup__error"></span>
    </PopupWithForm>
  );
}
