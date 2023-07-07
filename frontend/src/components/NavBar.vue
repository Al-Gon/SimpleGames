<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <router-link :to="'/'" custom v-slot="{ navigate }">
        <span class="navbar-brand" @click="navigate">
          <img alt="logo" src="@\assets\gamelogo.jpg" style="height: 2em" />
        </span>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <router-link
            v-for="(path, ind) in menuItems.paths"
            :key="ind"
            :to="path"
            custom
            v-slot="{ navigate, isActive }"
          >
            <li
              @click="navigate"
              class="nav-item"
              :class="{ active: isActive }"
            >
              <span class="nav-link" role="link">{{
                menuItems.itemsnames[ind]
              }}</span>
            </li>
          </router-link>
        </ul>
      </div>
      <div
        v-if="isUserAuthorized"
        class="d-flex align-items-center flex-column flex-lg-row"
      >
        <button @click="unAuthorizeUser" class="btn btn-dark">Выйти</button>
      </div>
      <div v-else class="d-flex align-items-center flex-column flex-lg-row">
        <button @click="showSignInWindow" class="btn btn-dark">Войти</button>
      </div>
    </div>

    <UniModal
      :ownId="'sign_in_window'"
      :header="'Авторизация пользователя'"
      :fieldsSettings="{
        fields: ['username', 'password'],
        names: ['Логин', 'Пароль'],
        types: ['text', 'password'],
      }"
      ref="signInWindow"
    >
      <template v-slot:signInWindow="{ signInUser }">
        <div class="d-flex flex-column">
          <div>
            <button
              @click.stop="signInUser"
              type="button"
              class="btn btn-warning"
            >
              Войти
            </button>
          </div>
          <div>
            <p>или</p>
          </div>
          <div>
            <button
              @click="showRegistrationWindow"
              type="button"
              class="btn btn-warning"
              data-bs-dismiss="modal"
            >
              Зарегистрироваться
            </button>
          </div>
        </div>
      </template>
    </UniModal>

    <UniModal
      :ownId="'registration_window'"
      :header="'Регистрация пользователя'"
      :fieldsSettings="{
        fields: ['username', 'email', 'password'],
        names: ['Логин', 'Email', 'Пароль'],
        types: ['text', 'email', 'password'],
      }"
      ref="registrationWindow"
    >
      <template v-slot:registrationWindow="{ registerNewUser }">
        <button @click="registerNewUser" type="button" class="btn btn-warning">
          Зарегистрироваться
        </button>
      </template>
    </UniModal>
  </nav>
</template>

<script>
import UniModal from '@/components/UniModal.vue';

export default {
  name: 'NavBar',

  components: {
    UniModal,
  },
  data: () => ({
    menuItems: {
      paths: ['/tictactoe', '/oldfields', '/scores'],
      itemsnames: ['Крестики-Нолики', 'Сохранённые игры', 'Общий счёт'],
      isActive: [false, false, false],
    },
  }),

  computed: {
    isUserAuthorized() {
      return this.$store.getters.isUserAuthorized;
    },
  },
  methods: {
    showSignInWindow() {
      this.$refs.signInWindow.showWindow();
    },
    unAuthorizeUser() {
      this.$store.commit('updateToken', '');
      this.$store.commit('updateGameList', []);
    },
    showRegistrationWindow() {
      this.$refs.signInWindow.hideWindow();
      setTimeout(() => {
        this.$refs.registrationWindow.showWindow();
      }, 500);
    },
  },
  //   watch: {
  //     currentPath() {
  //       this.menuItems.isActive.forEach((element) => {
  //         if (!element) element = false;
  //       });
  //       const index = this.menuItems.paths.findindex(this.currentPath);
  //       this.menuItems.isActive[index] = true;
  //     },
  //   },
};
</script>

<style scoped>
li.active span {
  color: red;
  text: bold;
}
</style>
