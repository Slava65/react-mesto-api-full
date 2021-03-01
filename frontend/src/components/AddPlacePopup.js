import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: name, link: link });
  }

  return (
    <PopupWithForm
      name={"place"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <input
        id="place-name"
        type="text"
        value={name}
        className="popup__text popup__text_place-name"
        name="name"
        placeholder="Название"
        required
        minLength="1"
        maxLength="30"
        onChange={handleChangeName}
      />
      <span id="place-name-error" className="popup__error"></span>
      <input
        id="place-link"
        type="url"
        value={link}
        className="popup__text popup__text_place-link"
        name="link"
        placeholder="Ссылка на картинку"
        onChange={handleChangeLink}
        required
      />
      <span id="place-link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}
