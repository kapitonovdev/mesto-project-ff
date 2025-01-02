const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
  headers: {
    authorization: 'a9b5db3b-41f0-4fef-b387-3b41719cf55a',
    'Content-Type': 'application/json',
  },
};

// Универсальная функция запроса
function request(url, options = {}) {
  return fetch(`${apiConfig.baseUrl}${url}`, {
    headers: apiConfig.headers,
    ...options,
    
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
}

export function getUserInfo() {
  return request('/users/me');
}

export function getCards() {
  return request('/cards');
}

export function setUserInfo({ name, about }) {
  return request('/users/me', {
    method: 'PATCH',
    body: JSON.stringify({
      name,
      about
    }),
  })
}

export function setUserAvatar(avatarUrl) {
  return request('/users/me/avatar', {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: avatarUrl
    })
  });
}

export function addCard({ name, link }) {
  return request('/cards', {
    method: 'POST',
    body: JSON.stringify({
      name,
      link
    }),
  });
}

export function deleteCard(cardId) {
  return request(`/cards/${cardId}`, {
    method: 'DELETE',
  });
}

export function addLike(cardId) {
  return request(`/cards/likes/${cardId}`, {
    method: 'PUT',
  });
}

export function removeLike(cardId) {
  return request(`/cards/likes/${cardId}`, {
    method: 'DELETE',
  });
}