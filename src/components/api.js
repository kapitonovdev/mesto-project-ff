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

// Функция получения информации о пользователе
export function getUserInfo() {
  return request('/users/me');
}

// Функция получения списка карточек
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