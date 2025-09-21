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
  get: async (url, params, auth = false) => {
    let finalUrl = url;
    if (params && typeof params === 'object' && Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString();
      finalUrl = `${url}?${queryString}`;
    }
    return await fetch(finalUrl, {
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
