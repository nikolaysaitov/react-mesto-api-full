import React from "react";
import { withRouter, Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    props.onSubmit(email, password);
  }

  return (
    <div className="authorization">
      <p className="authorization__entry">Регистрация</p>
      <form onSubmit={handleSubmit} className="authorization__form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="popup__text popup__text_type_authorization popup__text_type_email"
          required
          id="email-input"
          value={email}
          onChange={handleChangeEmail}
        />
        <span className="popup__text-error email-input-error"></span>
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className="popup__text popup__text_type_authorization popup__text_type_password"
          required
          id="password-input"
          value={password}
          onChange={handleChangePassword}
          minLength="6"
          maxLength="15"
        />
        <span className="popup__text-error password-input-error"></span>
        <button type="submit" className="authorization__button">
          Зарегистрироваться
        </button>
        <p className="authorization__text">
          Уже зарегистрированы?
          <Link className="authorization__text" to="/sign-in">
            {" "}
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default withRouter(Register);
