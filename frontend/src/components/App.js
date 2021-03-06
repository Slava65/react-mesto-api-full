import React from "react";
import { Route, Switch, useHistory, withRouter } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utiles/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { auth } from "../utiles/auth";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatar] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfile] = React.useState(false);
  const [isAddPlacePopupOpen, setIsEditPlace] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(undefined);
  const [currentUser, setCurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = React.useState("");
  const [userEmail, setEmail] = React.useState("");

  React.useEffect(() => {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      tokenCheck(jwt);
    } else {
      history.push("/signin");
    }
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  React.useEffect(() => {
    api
      .getInfoUser()
      .then((user) => {
        setCurrentUser(user.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  function onLogin(data) {
    const { email, password } = data;
    return auth
      .authorize(email, password)
      .then((res) => {
        let jwt = res.token;
        tokenCheck(jwt);
        localStorage.setItem("jwt", jwt);
        setEmail(email);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function tokenCheck(jwt) {
    auth
      .getContent(jwt)
      .then((res) => {
        setEmail(res.data.email);
        setCurrentUser(res.data);
        setLoggedIn(true);
        history.push("/");
      })
      .catch(() => {
        localStorage.removeItem("jwt", jwt);
        history.push("/signin");
      });
  }

  function onRegister(data) {
    const { email, password } = data;
    return auth
      .register(email, password)
      .then((res) => {
        console.log(email);
        setEmail(email);
        setInfoTooltipStatus("success");
        setIsInfoTooltipOpen(true);
        history.push("/");
      })
      .catch(() => {
        setInfoTooltipStatus("fail");
        setIsInfoTooltipOpen(true);
        setLoggedIn(false);
      });
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    history.push("/signin");
  }

  function closeInfoToolTip() {
    setIsInfoTooltipOpen(false);
  }

  function handleAvatarClick() {
    setIsEditAvatar(true);
  }

  function handleProfileClick() {
    setIsEditProfile(true);
  }

  function handlePlaceClick() {
    setIsEditPlace(true);
  }

  function closeAllPopups() {
    setIsEditAvatar(false);
    setIsEditProfile(false);
    setIsEditPlace(false);
    setSelectedCard(undefined);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function handleUpdateUser(currentUser) {
    api
      .editInfoUser(currentUser)
      .then((info) => {
        setCurrentUser(info.user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .setAva(avatar)
      .then((info) => {
        setCurrentUser(info.user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);
    api
      .setLike(card._id, isLiked)
      .then(({ data: newCard }) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(cardId, card) {
    api
      .delCard(cardId)
      .then((data) => {
        console.log(data);
        const newCards = cards.filter((c) => (c._id !== cardId ? c : ""));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header onSignOut={onSignOut} email={userEmail} />
        <Switch>
          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/signin">
            <Login handleLogin={onLogin} />
          </Route>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            onEditAvatar={handleAvatarClick}
            onEditProfile={handleProfileClick}
            onAddPlace={handlePlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main}
          />
        </Switch>
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          infoTooltipStatus={infoTooltipStatus}
          onClose={closeInfoToolTip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
