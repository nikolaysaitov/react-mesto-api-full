import React from "react";
import { withRouter } from "react-router-dom";

function Login(props) {
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
    props.onSubmit(email, password);
  }

  return (
    <div className="authorization">
      <p className="authorization__entry">Вход</p>
      <form onSubmit={handleSubmit} className="authorization__form" noValidate>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default withRouter(Login);
