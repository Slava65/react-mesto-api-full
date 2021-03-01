import logo from "../images/header-logo.svg";
import { Route, Link } from "react-router-dom";

function Header({ onSignOut, email }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место. Россия" />
      <Route exact path="/">
        <div className="header__info">
          <p className="header__email">{email}</p>
          <Link to={"/signin"} className="header__link" onClick={onSignOut}>
            Выход
          </Link>
        </div>
      </Route>
      <Route path="/signup">
        <Link to={"/signin"} className="header__link">
          Войти
        </Link>
      </Route>
      <Route path="/signin">
        <Link to={"/signup"} className="header__link">
          Зарегистрироваться
        </Link>
      </Route>
    </header>
  );
}

export default Header;
