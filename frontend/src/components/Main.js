import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentuser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__data">
          <div className="profile__ava-block">
            <img
              className="profile__avatar"
              src={currentuser.avatar}
              alt=""
              onClick={onEditAvatar}
            />
            <button
              type="button"
              className="profile__avatar-edit"
              aria-label="Редактировать"
            ></button>
          </div>
          <div className="profile__text">
            <h1 className="profile__name">{currentuser.name}</h1>
            <p className="profile__job">{currentuser.about}</p>
          </div>
          <button
            type="button"
            className="profile__edit-button"
            aria-label="Редактировать"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="Добавить"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="element__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              currentUser={currentuser}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
