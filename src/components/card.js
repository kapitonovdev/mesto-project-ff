// Создание карточки
export function createCard(cardData, { onImageClick, onDeleteClick, onLikeClick }) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Обработчик клика по изображению
  cardImage.addEventListener('click', () => onImageClick(cardData.name, cardData.link));

  // Удаление карточки
  deleteButton.addEventListener('click', () => onDeleteClick(cardElement));

  // Лайк карточки
  likeButton.addEventListener('click', () => onLikeClick(likeButton));

  return cardElement;
}

// Удаление карточки
export function handleCardDelete(cardElement) {
  cardElement.remove();
}

// Переключение лайка
export function handleCardLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}