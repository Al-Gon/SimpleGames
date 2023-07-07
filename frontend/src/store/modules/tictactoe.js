export default {
  state: {
    gameStates: [], // for storing game moves
    gameList: [], // for storing game itself
    token: '',
    // token: '14ae33f5a0bfa34691ccd3c33e21cde50d3f7ca6',
    userData: [],
    errors: [],
  },
  getters: {
    allGameStates(state) {
      return state.gameStates;
    },
    getLastState(state) {
      return JSON.parse(state.gameStates.slice(-1)[0]);
    },
    getGameList(state) {
      return state.gameList;
    },
    isUserAuthorized(state) {
      return state.token !== '';
    },
    getErrors(state) {
      return state.errors;
    },
  },
  mutations: {
    updateErrors(state, errors) {
      state.errors = errors;
    },
    //* *********************************************** */
    updateUserData(state, userData) {
      state.userData = userData;
    },
    updateToken(state, token) {
      state.token = token;
    },
    //* *********************************************** */
    updateGameList(state, gameList) {
      state.gameList = gameList;
    },
    pushGameItem(state, gameItem) {
      state.gameList.push(gameItem);
    },

    //* *********************************************** */
    pushGameState(state, gameField) {
      state.gameStates.push(JSON.stringify(gameField));
    },
    refreshGameState(state, gameField) {
      state.gameStates = [JSON.stringify(gameField)];
    },
    deleteLastState(state) {
      state.gameStates = state.gameStates.slice(0, state.gameStates.length - 1);
    },
  },
  actions: {
    // especialy for authorithation
    async registerUser(ctx, userData) {
      const res = await fetch(
        'http://127.0.0.1:8000/tictactoe/api/v1/auth/users/',
        {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.ok) {
        console.log(res.ok);
      }
      const resultsArr = await res.json();
      if (
        resultsArr.username === userData.username &&
        resultsArr.email === userData.email
      ) {
        ctx.commit('updateUserData', userData);
      } else {
        ctx.commit('updateErrors', resultsArr);
      }
    },
    async loginUser(ctx, userData) {
      const res = await fetch(
        'http://127.0.0.1:8000/tictactoe/auth/token/login/',
        {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.ok) {
        console.log(res.ok);
      }
      const resultsArr = await res.json();
      if (Object.prototype.hasOwnProperty.call(resultsArr, 'auth_token')) {
        ctx.commit('updateToken', resultsArr.auth_token);
      } else {
        ctx.commit('updateErrors', resultsArr);
      }
    },
    // especialy for gameList
    async fetchGamesList(ctx) {
      if (ctx.state.token.length) {
        const res = await fetch('http://127.0.0.1:8000/tictactoe/api/v1/', {
          method: 'GET',
          headers: {
            Authorization: `Token ${ctx.state.token}`,
          },
        });
        if (res.ok) {
          console.log('fetchGamesList ', res.ok);
        }
        const gameListFromRes = await res.json();
        ctx.commit('updateGameList', gameListFromRes.gamelist);
      }
    },

    async addGameInGameList(ctx, game) {
      const gameItem = JSON.stringify(game);
      console.log(gameItem);

      const res = await fetch('http://127.0.0.1:8000/tictactoe/api/v1/', {
        method: 'POST', // или 'PUT'
        body: gameItem, // данные могут быть 'строкой' или {объектом}!
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${ctx.state.token}`,
        },
      });
      if (res.ok) {
        console.log(res.ok);
        const gameItemFromRes = await res.json();
        ctx.commit('pushGameItem', gameItemFromRes.new_game);
      }
    },
  },
};
