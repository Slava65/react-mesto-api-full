class Auth {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _handleResult = (res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  };

  register = (email, password) => {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._handleResult);
  };

  authorize = (email, password) => {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._handleResult);
  };

  getContent = (token) => {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResult);
  };
}

export const auth = new Auth({
  url: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});