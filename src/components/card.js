import { addLike, removeLike, deleteCard } from './api.js';
import { openPopup, closePopup } from './modal.js';

// Создание карточки
export function createCard(cardData, { onImageClick, onDeleteClick, onLikeClick, userId }) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Добавляем число лайков
  likeCount.textContent = cardData.likes ? cardData.likes.length : 0;

  // Проверить, лайкнута ли картинка нашим userId
  if (cardData.likes.some((likeUser) => likeUser._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Удаление карточки (только если это наша карточка)
  if (cardData.owner._id !== userId) {
    deleteButton.style.display = 'none';
  }

  cardImage.addEventListener('click', () => onImageClick(cardData.name, cardData.link));

  deleteButton.addEventListener('click', () => onDeleteClick(cardData, cardElement));

  likeButton.addEventListener('click', () => onLikeClick(cardData, likeButton, likeCount));

  return cardElement;
}

export function handleCardLike(cardData, likeButton, likeCountElement) {
  const hasMyLike = likeButton.classList.contains('card__like-button_is-active');

  if (!hasMyLike) {
    addLike(cardData._id)
      .then((updatedCard) => {
        likeButton.classList.add('card__like-button_is-active');
        likeCountElement.textContent = updatedCard.likes.length;
        cardData.likes = updatedCard.likes;
      })
      .catch((err) => console.log('Ошибка при постановке лайка:', err));
  } else {
    removeLike(cardData._id)
      .then((updatedCard) => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCountElement.textContent = updatedCard.likes.length;
        cardData.likes = updatedCard.likes;
      })
      .catch((err) => console.log('Ошибка при удалении лайка:', err));
  }
}

export function handleCardDelete(cardData, cardElement, deletePopup, deleteForm) {
  openPopup(deletePopup);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    deleteCard(cardData._id)
      .then(() => {
        cardElement.remove();
        closePopup(deletePopup);
      })
      .catch((err) => console.error('Ошибка при удалении карточки:', err))
      .finally(() => {
        deleteForm.removeEventListener('submit', handleSubmit);
      });
  };

  deleteForm.addEventListener('submit', handleSubmit);
}