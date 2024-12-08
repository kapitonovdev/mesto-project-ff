import "../pages/index.css";
import { initialCards } from "../scripts/cards.js";
import {
  openPopup,
  closePopup
} from "../components/modal.js";
import { 
  createCard,
  handleCardDelete,
  handleCardLike
} from "../components/card.js";

const cardsContainer = document.querySelector(".places__list");

// Попапы
const profileEditPopup = document.querySelector(".popup_type_edit");
const cardAddPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

// Элементы внутри попапа изображения
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

// Элементы профиля
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const cardAddButton = document.querySelector(".profile__add-button");

// Форма редактирования профиля и её поля
const profileEditForm = profileEditPopup.querySelector(".popup__form");
const profileNameInput = profileEditForm.querySelector(".popup__input_type_name");
const profileJobInput = profileEditForm.querySelector(".popup__input_type_description");

// Форма добавления карточки и её поля
const cardAddForm = cardAddPopup.querySelector(".popup__form");
const cardNameInput = cardAddForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardAddForm.querySelector(".popup__input_type_url");

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
      onDeleteClick: handleCardDelete,
      onLikeClick: handleCardLike,
    });
    cardsContainer.append(cardElement);
  });
}

// Открытие попапа редактирования профиля с заполнением текущих данных
function handleProfileEditButtonClick() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(profileEditPopup);
}

// Обработчик отправки формы редактирования профиля
function handleProfileEditFormSubmit(event) {
  event.preventDefault();

  // Обновляем данные на странице из значений формы
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;

  // Закрываем попап после сохранения изменений
  closePopup(profileEditPopup);
}

// Обработчик добавления новой карточки
function handleCardAddFormSubmit(event) {
  event.preventDefault();

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  // Создаём новую карточку с помощью createCard
  const newCardElement = createCard(newCardData, {
    onImageClick: handleCardClick,
    onDeleteClick: handleCardDelete,
    onLikeClick: handleCardLike,
  });

  // Добавляем новую карточку в начало контейнера
  cardsContainer.prepend(newCardElement);

  // Очищаем форму
  cardAddForm.reset();

  // Закрываем попап после добавления карточки
  closePopup(cardAddPopup);
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
  cardAddButton.addEventListener("click", () => openPopup(cardAddPopup));
}

// Обработчик отправки для формы редактирования профиля
profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);

// Обработчик отправки для формы добавления карточки
cardAddForm.addEventListener("submit", handleCardAddFormSubmit);

renderCards(initialCards);
initializePopups();
