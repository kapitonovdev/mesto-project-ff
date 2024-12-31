import { addLike, removeLike } from './api.js';

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
  //   Проверяем: cardData.owner._id === userId ?
  //   Если нет, можно убрать или скрыть кнопку.
  if (cardData.owner._id !== userId) {
    deleteButton.style.display = 'none'; // скрываем иконку удаления
  }

  // Обработчик клика по изображению
  cardImage.addEventListener('click', () => onImageClick(cardData.name, cardData.link));

  // Удаление карточки
  deleteButton.addEventListener('click', () => onDeleteClick(cardData, cardElement));

  // Лайк карточки
  likeButton.addEventListener('click', () => onLikeClick(cardData, likeButton, likeCount));

  return cardElement;
}

export function handleCardDelete(cardData, cardElement) {
  // Запоминаем
  cardIdToDelete = cardData._id;
  cardElementToDelete = cardElement;
  // Открываем попап
  openPopup(deleteCardPopup);
}

export function handleCardLike(cardData, likeButton, likeCountElement) {
  const hasMyLike = likeButton.classList.contains('card__like-button_is-active');

  if (!hasMyLike) {
    // Ставим лайк
    addLike(cardData._id)
      .then((updatedCard) => {
        // Обновим DOM
        likeButton.classList.add('card__like-button_is-active');
        likeCountElement.textContent = updatedCard.likes.length;
        // Обновим cardData.likes, если нужно
        cardData.likes = updatedCard.likes;
      })
      .catch((err) => console.log('Ошибка при постановке лайка:', err));
  } else {
    // Убираем лайк
    removeLike(cardData._id)
      .then((updatedCard) => {
        // Обновим DOM
        likeButton.classList.remove('card__like-button_is-active');
        likeCountElement.textContent = updatedCard.likes.length;
        // Обновим cardData.likes
        cardData.likes = updatedCard.likes;
      })
      .catch((err) => console.log('Ошибка при удалении лайка:', err));
  }
}
