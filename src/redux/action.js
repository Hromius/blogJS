/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable consistent-return */

export function send(page = 1) {
  const offset = 5 * page - 5;

  return async (dispatch) => {
    try {
      if (localStorage.getItem('userKey')) {
        const res_articles = await fetch(
          `https://kata.academy:8021/api/articles?limit=5&offset=${offset}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userKey')}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
        const articles = await res_articles.json();
        dispatch({ type: 'ADD_ARTICLES', articles, pageNumber: page });
      } else {
        const res_articles = await fetch(`https://kata.academy:8021/api/articles?limit=5&offset=${offset}`);
        const articles = await res_articles.json();
        dispatch({ type: 'ADD_ARTICLES', articles });
      }
    } catch (error) {
      console.log(error);
      return dispatch({ type: 'ERROR', error });
    }
  };
}

export function getNeedArticles(slug) {
  return async (dispatch) => {
    try {
      const res_articles = await fetch(`https://kata.academy:8021/api/articles/${slug}`);

      const articles = await res_articles.json();

      dispatch({ type: 'ADD_NEED_ARTICLES', needArticles: articles });
    } catch (error) {
      console.log(error);
      return dispatch({ type: 'ERROR', error });
    }
  };
}

export function userRegister(login, email, password) {
  return async (dispatch) => {
    const user = {
      user:
                      {
                        username: login,
                        email,
                        password,
                      },
    };

    const res = await fetch('https://kata.academy:8021/api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const result = await res.json();

    if (result.errors) return dispatch({ type: 'ERROR_REGISTER', register: result.errors });

    if (!result.errors) dispatch({ type: 'NO_ERROR_REGISTER', register: result.errors });

    localStorage.setItem('userKey', result.user.token);
    return dispatch({ type: 'REGISTER_SUCCESS', register: result });
  };
}

export function userlogin(email, password) {
  return async (dispatch) => {
    const user = {
      user:
                        {
                          email,
                          password,
                        },
    };
    const res = await fetch('https://kata.academy:8021/api/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const result = await res.json();

    if (result.errors) return dispatch({ type: 'ERROR_LOGIN' });

    const resProfile = await fetch(`https://kata.academy:8021/api/profiles/${result.user.username}`);

    const resultProfile = await resProfile.json();
    localStorage.setItem('userKey', result.user.token);

    return dispatch({ type: 'USER_LOGIN', resultProfile });
  };
}

export function currentUser() {
  return async (dispatch) => {
    try {
      if (!localStorage.getItem('userKey')) return;
      const res = await fetch(
        'https://kata.academy:8021/api/user',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userKey')}`,
          },
        },
      );

      const result = await res.json();

      if (result.errors) return;

      const resProfile = await fetch(`https://kata.academy:8021/api/profiles/${result.user.username}`);

      const resultProfile = await resProfile.json();

      return dispatch({ type: 'CURRENT_USER', result, resultProfile });
    } catch (error) {
      console.log(error);
      return dispatch({ type: 'ERROR', error });
    }
  };
}

export const logOut = () => ({ type: 'LOGOUT' });

export function updateUser(data) {
  return async (dispatch) => {
    try {
      const userObj = {};
      if (data.email) userObj.email = data.email;
      if (data.password) userObj.password = data.password;
      if (data.username) userObj.username = data.username;
      if (data.image) userObj.image = data.image;

      const user = { user: { ...userObj } };

      const res = await fetch(
        'https://kata.academy:8021/api/user',
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userKey')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        },
      );

      const result = await res.json();
      if (result.errors) {
        return dispatch({ type: 'UPDATE_USER_ERROR', updateError: result });
      }
      console.log(result);

      return dispatch({ type: 'UPDATE_USER', result });
    } catch (error) {
      console.log(error);
      return dispatch({ type: 'ERROR', error });
    }
  };
}

export function createArticle(articles) {
  const article = { article: articles };
  return async (dispatch) => {
    try {
      const res = await fetch(
        'https://kata.academy:8021/api/articles',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userKey')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(article),
        },
      );

      await res.json();
    } catch (error) {
      console.log(error);
      return dispatch({ type: 'ERROR', error });
    }
  };
}

export function updateArticle(articles, slug) {
  const article = { article: articles };
  return async (dispatch) => {
    try {
      const res = await fetch(
        `https://kata.academy:8021/api/articles/${slug}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userKey')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(article),
        },
      );

      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.log(error);
      return dispatch({ type: 'ERROR', error });
    }
  };
}

export function deleteArticle(slug) {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `https://kata.academy:8021/api/articles/${slug}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userKey')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      console.log(res);
    } catch (error) {
      console.log(error);
      return dispatch({ type: 'ERROR', error });
    }
  };
}

export function favoritesPost(slug) {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `https://kata.academy:8021/api/articles/${slug}/favorite`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userKey')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      const result = await res.json();

      return dispatch({ type: 'UPDATE_FAVORITES', result });
    } catch (error) {
      console.log(error);
      return dispatch({ type: 'ERROR', error });
    }
  };
}

export function favoritesDelete(slug) {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `https://kata.academy:8021/api/articles/${slug}/favorite`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userKey')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      const result = await res.json();

      return dispatch({ type: 'UPDATE_FAVORITES', result });
    } catch (error) {
      console.log(error);
      return dispatch({ type: 'ERROR', error });
    }
  };
}
