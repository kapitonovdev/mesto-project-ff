// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');

// Функция создания карточки
function createCard(cardData, deleteCard) {
  // Клонируем шаблон
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // Устанавливаем значения вложенных элементов
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  // Устанавливаем изображение и заголовок
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Добавляем обработчик для удаления карточки
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Выводим карточки на страницу
function renderCards(cardsData) {
  cardsData.forEach(cardData => {
    const cardElement = createCard(cardData, deleteCard);
    placesList.append(cardElement);
  });
}

// Вызов функции для отображения всех карточек из массива initialCards
renderCards(initialCards);
