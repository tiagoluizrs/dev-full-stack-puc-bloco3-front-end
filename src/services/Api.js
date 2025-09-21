// Api.js

const getHeader = (auth = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (auth) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      headers['Authorization'] = `Bearer ${user.token}`;
    }
  }
  return headers;
};

const Api = {
  get: async (url, auth = false) => {
    return await fetch(url, {
      method: 'GET',
      headers: getHeader(auth),
    });
  },
  post: async (url, data, auth = false) => {
    return await fetch(url, {
      method: 'POST',
      headers: getHeader(auth),
      body: JSON.stringify(data),
    });
  },
  put: async (url, data, auth = false) => {
    return await fetch(url, {
      method: 'PUT',
      headers: getHeader(auth),
      body: JSON.stringify(data),
    });
  },
  delete: async (url, auth = false) => {
    return await fetch(url, {
      method: 'DELETE',
      headers: getHeader(auth),
    });
  },
};

export default Api;

