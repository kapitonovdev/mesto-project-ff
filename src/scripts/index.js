import "../pages/index.css";
import {
  openPopup,
  closePopup
} from "../components/modal.js";
import { 
  createCard,
  handleCardDelete,
  handleCardLike
} from "../components/card.js";
import { enableValidation, clearValidation } from '../components/validation.js';
import { 
  getUserInfo,
  getCards,
  setUserInfo,
  setUserAvatar,
  addCard,
  deleteCard
} from '../components/api.js';


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const cardsContainer = document.querySelector(".places__list");

// Попапы
const profileEditPopup = document.querySelector(".popup_type_edit");
const cardAddPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const deleteCardPopup = document.querySelector('.popup_type_delete-card');

// Элементы внутри попапа изображения
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

// Элементы профиля
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const cardAddButton = document.querySelector(".profile__add-button");

// Форма редактирования профиля и её поля
// const profileEditForm = profileEditPopup.querySelector(".popup__form");
const profileEditForm = document.forms["edit-profile"];
// const profileNameInput = profileEditForm.querySelector(".popup__input_type_name");
const profileNameInput = document.forms["edit-profile"].name;
// const profileJobInput = profileEditForm.querySelector(".popup__input_type_description");
const profileJobInput = document.forms["edit-profile"].description;
// Форма удаления карточки
const deleteCardForm = document.forms["delete-card"];

// Глобальные переменные для запоминания, какую карточку хотим удалить
let cardIdToDelete = null;
let cardElementToDelete = null;

// Попап добавления аватара
const avatarEditPopup = document.querySelector('.popup_type_avatar');
const avatarEditForm = document.forms["edit-avatar"]; // <form name="edit-avatar" ...>
const avatarInput = avatarEditForm.querySelector('.popup__input_type_url');

// Форма добавления карточки и её поля
const cardAddForm = cardAddPopup.querySelector(".popup__form");
const cardNameInput = cardAddForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardAddForm.querySelector(".popup__input_type_url");

// ID пользователя
let currentUserId;

// Функция открытия imagePopup
function handleCardClick(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openPopup(imagePopup);
}

// Рендеринг карточек
function renderCards(cardsData) {
  cardsData.forEach((cardData) => {
    const cardElement = createCard(cardData, {
      onImageClick: handleCardClick,
      onDeleteClick: openDeletePopup,
      onLikeClick: handleCardLike,
      userId: currentUserId
    });
    cardsContainer.append(cardElement);
  });
}

// Открытие попапа редактирования профиля с заполнением текущих данных
function handleProfileEditButtonClick() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  clearValidation(profileEditForm, validationConfig);
  openPopup(profileEditPopup);
}

// Обработчик отправки формы редактирования профиля
function handleProfileEditFormSubmit(event) {
  event.preventDefault();

    
  const submitButton = profileEditForm.querySelector(validationConfig.submitButtonSelector);
  const originalButtonText = submitButton.textContent;

  // Меняем текст кнопки на "Сохранение..."
  submitButton.textContent = "Сохранение...";

  // Обновляем данные на странице из значений формы
  const newProfileName = profileNameInput.value;
  const newProfileJob = profileJobInput.value;

  setUserInfo({ name: newProfileName, about: newProfileJob })
    .then((updateduserData) => {
      profileName.textContent = newProfileName;
      profileJob.textContent = newProfileJob;
      profileAvatar.style.backgroundImage = `url(${updateduserData.avatar})`;

      // Закрываем попап после сохранения изменений
      closePopup(profileEditPopup);
    })
    .catch((error) => console.log('Не удалось обновить информацию о пользователе', error))
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

// Обработчик добавления новой карточки
function handleCardAddFormSubmit(event) {
  event.preventDefault();

  const submitButton = cardAddForm.querySelector(validationConfig.submitButtonSelector);
  const originalButtonText = submitButton.textContent;

  // Меняем текст кнопки на "Сохранение..."
  submitButton.textContent = "Сохранение...";

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  addCard(newCardData)
    .then((cardFromServer) => {
      const newCardElement = createCard(cardFromServer, {
        onImageClick: handleCardClick,
        onDeleteClick: handleCardDelete,
        onLikeClick: handleCardLike,
      });

      // Добавляем карточку в начало
      cardsContainer.prepend(newCardElement);

      // Очищаем форму
      cardAddForm.reset();

      // Закрываем попап после добавления карточки
      closePopup(cardAddPopup);          
    })
    .catch((error) => {
      console.error('Ошибка при добавлении карточки:', error);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

// Обработчик удаления карточки
deleteCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!cardIdToDelete) return;

  deleteCard(cardIdToDelete)
    .then(() => {
      // Удаляем элемент из DOM
      cardElementToDelete.remove();
      cardIdToDelete = null;
      cardElementToDelete = null;
      closePopup(deleteCardPopup);
    })
    .catch((err) => console.log('Ошибка при удалении карточки:', err));
});

function openDeletePopup(cardData, cardElement) {
  cardIdToDelete = cardData._id;
  cardElementToDelete = cardElement;
  openPopup(deleteCardPopup);
}

// Инициализация попапов
function initializePopups() {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) => {
    popup.classList.add("popup_is-animated");

    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener("click", () => closePopup(popup));

    popup.addEventListener('mousedown', (event) => {
      if (event.target === event.currentTarget) {
        closePopup(popup);
      }
    });
  });

  profileEditButton.addEventListener("click", handleProfileEditButtonClick);
  cardAddButton.addEventListener("click", () => {
    clearValidation(cardAddForm, validationConfig);
    cardAddForm.reset();
    openPopup(cardAddPopup);
  });
}

// Обработчик отправки для формы редактирования профиля
profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);

// Обработчик отправки для формы добавления карточки
cardAddForm.addEventListener("submit", handleCardAddFormSubmit);

// Функция обновления DOM
function updateUserInfo({ name, about, avatar }) {
  profileName.textContent = name;
  profileJob.textContent = about;
  profileAvatar.style.backgroundImage = `url(${avatar})`;
}

function handleAvatarFormSubmit(event) {
  event.preventDefault();

  const submitButton = avatarEditForm.querySelector(validationConfig.submitButtonSelector);
  const originalButtonText = submitButton.textContent;

  // Меняем текст кнопки на "Сохранение..."
  submitButton.textContent = "Сохранение...";

  // Берём ссылку из инпута
  const newAvatarLink = avatarInput.value;

  // Вызываем наш API
  setUserAvatar(newAvatarLink)
    .then((updatedData) => {
      // Обновлённые данные с сервера
      // В updatedData.avatar лежит новый URL
      profileAvatar.style.backgroundImage = `url(${updatedData.avatar})`;

      // Закрываем попап
      closePopup(avatarEditPopup);

      // Сброс формы (очистка поля)
      avatarEditForm.reset();
    })
    .catch((err) => {
      console.error('Ошибка при обновлении аватара:', err);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

avatarEditForm.addEventListener('submit', handleAvatarFormSubmit);

const avatarEditIcon = document.querySelector('.profile__image-edit-icon');
avatarEditIcon.addEventListener('click', () => {
  clearValidation(avatarEditForm, validationConfig);
  avatarEditForm.reset();

  openPopup(avatarEditPopup);
});

document.addEventListener('DOMContentLoaded', () => {
  Promise.all([getUserInfo(), getCards()])
    .then(([userData, cardsData]) => {
      currentUserId = userData._id;

      updateUserInfo(userData);
      renderCards(cardsData);      
    })
    .catch((err) => {
      console.log('Error:', err);
    });
});

initializePopups();
enableValidation(validationConfig);