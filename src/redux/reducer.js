/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */

export default function reducer(state, action) {
  if (state === undefined) {
    state = {
      articles: [],
      needArticles: [],
      loadArticles: false,
      loadNeedArticles: false,
      errorRegister: false,
      errorlogin: false,
      updateError: false,
      userName: false,
      userImage: false,
      page: 1,
    };
  }

  if (action.type === 'ADD_ARTICLES') {
    return {
      ...state, articles: action.articles, loadArticles: true, page: action.pageNumber,
    };
  }
  if (action.type === 'ADD_NEED_ARTICLES') return { ...state, needArticles: action.needArticles, loadNeedArticles: true };
  if (action.type === 'ERROR_REGISTER') return { ...state, errorRegister: action.register };
  if (action.type === 'NO_ERROR_REGISTER') return { ...state, errorRegister: false };
  if (action.type === 'REGISTER_SUCCESS') return { ...state, userToken: action.register.user.token, userName: action.register.user.username };
  if (action.type === 'USER_LOGIN') {
    return {
      ...state, userName: action.resultProfile.profile.username, errorlogin: false, userImage: action.resultProfile.profile.image,
    };
  }
  if (action.type === 'ERROR_LOGIN') {
    return {
      ...state, errorlogin: true, userName: false, userImage: false,
    };
  }
  if (action.type === 'CURRENT_USER') return { ...state, userName: action.resultProfile.profile.username, userImage: action.resultProfile.profile.image };
  if (action.type === 'LOGOUT') {
    return {
      ...state, userName: false, userImage: false, errorRegister: false, errorlogin: false,
    };
  }
  if (action.type === 'UPDATE_USER') {
    return {
      ...state,
      updateError: false,
      userName: action.result.user.username ? action.result.user.username : state.userName,
      userImage: action.result.user.image ? action.result.user.image : state.userImage,
    };
  }
  if (action.type === 'UPDATE_USER_ERROR') return { ...state, updateError: action.updateError };
  if (action.type === 'UPDATE_FAVORITES') {
    const kek = {};
    Object.assign(kek, state);
    const { length } = state.articles.articles;
    for (let i = 0; i < length; i++) {
      if (kek.articles.articles[i].slug === action.result.article.slug) {
        kek.articles.articles[i].favorited = action.result.article.favorited;
        kek.articles.articles[i].favoritesCount = action.result.article.favoritesCount;
      }
    }
    return { ...kek };
  }

  return state;
}

/* Object { user: {…} }

user: Object { username: "lalka", email: "argakoff_s97@mail.ru", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJpZCI6IjYyNDIzMWIzZmQyMTFjMjEwMGRiMmVhNSIsInVzZXJuYW1lIjoibGFsa2EiLCJleHAiOjE2NTM3NzkyMzQsImlhdCI6MTY0ODU5NTIzNH0.Cz5k4RbsfI9Ugxb_0u7He7k5ONBKz-WPMkHCOnGCKew" }
*/

/*
Promise { <state>: "pending" }
<state>: "fulfilled"
<value>: Object { user: {…} }
user: Object { username: "lalka", email: "argakoff_s97@mail.ru", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJpZCI6IjYyNDIzMWIzZmQyMTFjMjEwMGRiMmVhNSIsInVzZXJuYW1lIjoibGFsa2EiLCJleHAiOjE2NTM2ODkyNjcsImlhdCI6MTY0ODUwNTI2N30
.iv4v7SPob21B-1BWBUv6fHBGx1S_VRuywAHpiuPIxac" }
//password": "lalka"
*/
