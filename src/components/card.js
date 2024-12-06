// Создание карточки
export function createCard(cardData, handleCardClick) {
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
  cardImage.addEventListener('click', () => handleCardClick(cardData));

  // Удаление карточки
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  // Лайк карточки
  likeButton.addEventListener('click', () => toggleLike(likeButton));

  return cardElement;
}

// Удаление карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Переключение лайка
function toggleLike(button) {
  button.classList.toggle('card__like-button_is-active');
}
