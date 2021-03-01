export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_image ${card && "popup_opened"}`}>
      <figure className="popup__image-container">
        <img
          className="popup__big-image"
          src={card && card.link}
          alt={card && card.name}
        />
        <button
          type="button"
          className="popup__close popup__close_image"
          aria-label="Закрыть Окно"
          onClick={onClose}
        ></button>
        <p className="popup__image-name">{card && card.name}</p>
      </figure>
    </div>
  );
}
