import "../pages/index.css";
import { initialCards } from "../scripts/cards.js";
import {
  openPopup,
  closePopup,
  overlayPopupClose,
} from "../components/modal.js";
import { createCard } from "../components/card.js";

const cardsContainer = document.querySelector(".places__list");
const editPopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

// Кнопки и поля формы профиля
const editButton = document.querySelector(".profile__edit-button");
const closeEditButton = editPopup.querySelector(".popup__close");
const addButton = document.querySelector(".profile__add-button");
const closeAddCardButton = addCardPopup.querySelector(".popup__close");
const closeImageButton = imagePopup.querySelector(".popup__close");

// Поля профиля
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// Форма редактирования профиля и её поля
const formElement = editPopup.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

// Форма добавления карточки и её поля
const addCardForm = addCardPopup.querySelector(".popup__form");
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");

// Функция открытия imagePopup
function handleCardClick(cardData) {
  imagePopupImage.src = cardData.link;
  imagePopupImage.alt = cardData.name;
  imagePopupCaption.textContent = cardData.name;
  openPopup(imagePopup);
}

// Рендеринг карточек
function renderCards(cardsData) {
  cardsData.forEach((cardData) => {
    const cardElement = createCard(cardData, handleCardClick);
    cardsContainer.append(cardElement);
  });
}

// Открытие попапа редактирования профиля с заполнением текущих данных
function handleEditButtonClick() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
}

// Обработчик «отправки» формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();

  // Обновляем данные на странице из значений формы
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  // Закрываем попап после сохранения изменений
  closePopup(editPopup);
}

// Обработчик добавления новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  // Создаём новую карточку с помощью createCard
  const newCardElement = createCard(newCardData, handleCardClick);

  // Добавляем новую карточку в начало контейнера
  cardsContainer.prepend(newCardElement);

  // Очищаем форму
  addCardForm.reset();

  // Закрываем попап после добавления карточки
  closePopup(addCardPopup);
}

// Инициализация попапов
function initializePopups() {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) => {
    popup.classList.add("popup_is-animated");
    overlayPopupClose(popup);
  });

  editButton.addEventListener("click", handleEditButtonClick);
  closeEditButton.addEventListener("click", () => closePopup(editPopup));

  addButton.addEventListener("click", () => openPopup(addCardPopup));
  closeAddCardButton.addEventListener("click", () => closePopup(addCardPopup));

  closeImageButton.addEventListener("click", () => closePopup(imagePopup));
}

// Обработчик отправки для формы редактирования профиля
formElement.addEventListener("submit", handleFormSubmit);

// Обработчик отправки для формы добавления карточки
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

renderCards(initialCards);
initializePopups();
