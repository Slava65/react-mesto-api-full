import logoSuccess from "../images/infoTooltip-success.svg";
import logoFail from "../images/infoTooltip-error.svg";

function InfoTooltip({ isOpen, infoTooltipStatus, onClose }) {
  return (
    <div className={`infotooltip ${isOpen && "infotooltip_opened"}`}>
      <form className="infotooltip__container">
        <button
          type="button"
          className="infotooltip__close"
          aria-label="Закрыть Окно"
          onClick={onClose}
        ></button>
        <img
          className="infotooltip__logo"
          src={infoTooltipStatus === "success" ? logoSuccess : logoFail}
          alt="logo"
        />
        <p className="infotooltip__text">
          {infoTooltipStatus === "success"
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </p>
      </form>
    </div>
  );
}

export default InfoTooltip;
