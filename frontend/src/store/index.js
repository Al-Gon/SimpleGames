import { createStore } from 'vuex';
import titactoe from './modules/tictactoe';

export default createStore({
  modules: {
    titactoe,
  },
});
