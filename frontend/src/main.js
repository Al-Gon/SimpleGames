import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  fa0,
  fa1,
  fa2,
  fa3,
  fa4,
  fa5,
  fa6,
  fa7,
  fa8,
  fa9,
  faMinus,
  faY,
  faO,
  faU,
  faM,
  faE,
  faAngleLeft,
  faAngleRight,
  faP,
  faT,
  faR,
  faJ,
  faC,
  faDog,
  faCat,
} from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import router from './router';
import store from './store';
/* import the fontawesome core */

/* import font awesome icon component */

/* import specific icons */

/* add icons to the library */
library.add(
  fa0,
  fa1,
  fa2,
  fa3,
  fa4,
  fa5,
  fa6,
  fa7,
  fa8,
  fa9,
  faMinus,
  faY,
  faO,
  faU,
  faM,
  faE,
  faAngleLeft,
  faAngleRight,
  faP,
  faT,
  faR,
  faJ,
  faC,
  faDog,
  faCat
);

createApp(App)
  .use(store)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
