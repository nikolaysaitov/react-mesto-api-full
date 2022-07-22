/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import * as auth from "../utils/auth.js";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [isReg, setIsReg] = useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard({
      isOpened: true,
      name: card.name,
      link: card.link,
    });
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoPopupOpen(false);
    setSelectedCard({ ...selectedCard, isOpened: false });
  }
 
  useEffect(() => {
    handleTokenCheck();
    if (loggedIn) {
      const token = localStorage.getItem('jwt');
      Promise.all([api.getProfile(token), api.getInitialCards(token)])
        .then(([userData, cardData]) => {
          setCurrentUser(userData);
          setCards(cardData);
        }) 
        .catch((err) => console.log(`Ошибка ${err}`));
    }
  }, [loggedIn]);


  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard ||
    isInfoPopupOpen;

  useEffect(() => {
    function closeByEscape(event) {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleOverley(event) {
      if (
        event.target.classList.contains("popup_open") ||
        event.target.classList.contains("popup__close")
      ) {
        closeAllPopups();
      }
    }
    document.addEventListener("mousedown", handleOverley);
    return () => document.removeEventListener("mousedown", handleOverley);
  }, [isOpen]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    api
      .getProfile(token)
      .then((res) => setCurrentUser(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    api
      .getInitialCards(token)
      .then((cards) => setCards(cards))
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const token = localStorage.getItem('jwt');

    // Отправляем запрос в API и получаем обновлённые данные карточки
    const changeLikeCardStatus = !isLiked
      ? api.addLike(card._id, token)
      : api.deleteLike(card._id, token);
    changeLikeCardStatus
      .then((newCard) => {
        setCards((item) => item.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  const handleCardDelete = (card) => {
    const token = localStorage.getItem('jwt');
    api
      .deleteCard(card._id, token)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  };

  const handleUpdateUser = (name, about) => {
    const token = localStorage.getItem('jwt');
    api
      .editProfile(name, about, token)
      .then((item) => {
        setCurrentUser(item);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  };
  const handleUpdateAvatar = (avatar) => {
    const token = localStorage.getItem('jwt');
    api
      .updateAvatar(avatar.avatar, token)
      .then((item) => {
        setCurrentUser(item);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  };
  const handleAddPlaceSubmit = (name, link) => {
    const token = localStorage.getItem('jwt');
    api
      .addCard(name, link, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  };

  function handleLogin() {
    setLoggedIn(true);
  }
  function handleLoginSubmit(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setEmail(email);
        handleLogin();
        history.push("/");
      })
      .catch((err) => {
        setInfoPopupOpen(true);
        console.log(`Ошибка входа ${err}`);
        setIsReg(false);
      });
  }

  function handleRegistrSubmit(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsReg(true);
          history.push("/sign-in");
        } else {
          setIsReg(false);
          console.log("else");
        }
      })
      .catch((err) => {
        console.log(`Ошибка входа ${err}`);
        setIsReg(false);
      })
      .finally(() => {
        setInfoPopupOpen(true);
      });
  }

  function handleExit() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          handleLogin();
          history.push("/");
          setEmail(res.email);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} onExit={handleExit} />
        
        <Switch>
       
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            cards={cards}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} onSubmit={handleLoginSubmit} />
          </Route>

          <Route path="/sign-up">
            <Register
              handleLogin={handleLogin}
              onSubmit={handleRegistrSubmit}
            />
          </Route>
          
        </Switch>
       
        <InfoTooltip isOPen={isInfoPopupOpen} isReg={isReg} />

        {loggedIn && <Footer />}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        {/* попап вы уверены? */}
        <PopupWithForm
          name="formDelete"
          title="Вы уверены?"
          id="popup__form popup__form_add"
          formName="formDelete"
          buttonText="Да"
          onClose={closeAllPopups}
        >
          <input name="formDelete" className="popup__form popup__form_add" />
        </PopupWithForm>

        {/* попап открытия картинки */}
        <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
   
  );
}

export default App;