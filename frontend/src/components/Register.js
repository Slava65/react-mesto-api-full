import { useState } from "react";

function Register({ onRegister }) {
  const [data, setData] = useState({
    email: "",
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
    let { email, password } = data;
    onRegister({ email, password });
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h2 className="register__title">Регистрация</h2>
      <input
        id="email"
        name="email"
        type="email"
        className="register__data"
        placeholder="E-mail"
        onChange={handleChange}
      ></input>
      <input
        id="password"
        name="password"
        type="password"
        className="register__data"
        placeholder="Пароль"
        onChange={handleChange}
      ></input>
      <button
        type="submit"
        className="register__sign-up"
        aria-label="Зарегистрироваться"
      >
        Зарегистрироваться
      </button>
      <p className="register__question">
        Уже Зарегистрированы?
        <a className="register__sign-in" href="/">
          Войти
        </a>
      </p>
    </form>
  );
}

export default Register;
