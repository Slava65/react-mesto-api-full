import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(currentUser)
    onUpdateUser({
      name: name,
      about: description,
    });
    console.log(currentUser.name)
  }

  return (
    <PopupWithForm
      name={"profile"}
      title={"Редактировать профиль"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      {name && (
        <input
          id="profile-name"
          type="text"
          value={name}
          className="popup__text popup__text_name"
          name="name"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChangeName}
        />
      )}
      <span id="profile-name-error" className="popup__error"></span>
      {description && (
        <input
          id="profile-job"
          type="text"
          value={description}
          className="popup__text popup__text_job"
          name="about"
          required
          minLength="2"
          maxLength="200"
          onChange={handleChangeDescription}
        />
      )}
      <span id="profile-job-error" className="popup__error"></span>
    </PopupWithForm>
  );
}
