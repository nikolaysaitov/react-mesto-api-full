import React from "react";
import ok from "../images/ok.svg";
import error from "../images/error.svg";

function InfoTooltip({ isOPen, isReg }) {
  return (
    <div className={isOPen ? "popup popup_open" : "popup"}>
      <div className="popup__container">
        <img
          className="popup__info-icon"
          src={isReg ? ok : error}
          alt="результат регистрации"
        />
        <p className="popup__info-text">
          {isReg
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
        <button type="button" className="popup__close" />
      </div>
    </div>
  );
}

export default InfoTooltip;
