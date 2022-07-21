import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__id">
          <div className="profile__id-wrapper" onClick={onEditAvatar}>
            <img
              src={currentUser.avatar}
              className="profile__id-avatar"
              alt="аватар"
            />
          </div>

          <div className="profile__id-info">
            <div className="profile__name">
              <h1 className="profile__id-title">{currentUser.name}</h1>
              <button
                className="profile__button-edit"
                type="button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__id-subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__button-add"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="pictures">
        <ul className="pictures__board">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
