import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };
  // Определяем, являемся ли мы владельцем текущей карточки
  const currentUser = React.useContext(CurrentUserContext);
  // const isOwn = card.owner._id === currentUser._id;
  const isOwn = card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `pictures__delete ${
    isOwn ? "" : "pictures__delete_hidden"
  }`;
  console.log('some-secret-key');


  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `pictures__like ${
    isLiked && "pictures__like_active"
  }`;

  return (
    <li className="pictures__item">
      <button
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="удалить"
      ></button>

      <img
        className="pictures__image"
        alt={card.name}
        src={card.link}
        onClick={handleClick}
      />
      <div className="pictures__description">
        <h2 className="pictures__title">{card.name}</h2>
        <div className="pictures__like-box">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
          ></button>
          <span className="pictures__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
