import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, currentUser, onCardLike, onCardDelete }) {
  function handleImageClick() {
    onCardClick(card);
  }
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete ${isOwn ? '' : 'element__delete_none'}`
  ); 

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id, card);
  }
  
  const isLiked = card.likes.some(id => id === currentUser._id)

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <li className="element">
      <article>
        <img
          className="element__image"
          alt={card.name}
          src={card.link}
          onClick={handleImageClick}
        />
        <button
          type="button"
          className={cardDeleteButtonClassName}
          aria-label="Удалить"
          onClick={handleDeleteClick}
        ></button>
        <div className="element__place">
          <p id="point" className="element__point">
            {card.name}
          </p>
          <div className="element__likeblock">
            <button
              type="button"
              className={`element__like ${isLiked && "element__like_active"}`}
              aria-label="Нравится"
              onClick={handleLikeClick}
            ></button>
            <p className="element__likecount">{card.likes.length}</p>
          </div>
        </div>
      </article>
    </li>
    </CurrentUserContext.Provider>
  );
}
