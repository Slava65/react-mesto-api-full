import { useState } from "react";
import { withRouter } from "react-router-dom";

function Login({ handleLogin }) {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2 className="login__title">Вход</h2>
      <input
        id="email"
        name="email"
        type="email"
        className="login__data"
        placeholder="E-mail"
        onChange={handleChange}
      ></input>
      <input
        id="password"
        name="password"
        type="password"
        className="login__data"
        placeholder="Пароль"
        onChange={handleChange}
      ></input>
      <button type="submit" className="login__sign-in" aria-label="Войти">
        Войти
      </button>
    </form>
  );
}

export default withRouter(Login);
