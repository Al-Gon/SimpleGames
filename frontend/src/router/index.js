import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/oldfields',
    name: 'oldfields',
    component: () => import('../views/OldFieldsView.vue'),
  },
  {
    path: '/scores',
    name: 'scores',
    component: () => import('../views/ScoresView.vue'),
  },
  {
    path: '/tictactoe',
    name: 'tictactoe',
    component: () => import('../views/TicTacToeView.vue'),
  },
  {
    path: '/tictactoe/field/:player/:fieldsize',
    name: 'field',
    component: () => import('../views/FieldView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
});

// router.beforeEach((to) => {
//   console.log(to.path);
// });

export default router;
