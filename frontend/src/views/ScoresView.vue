<template>
  <div>
    <div v-if="resutMessage !== ''" class="container mt-5">
      <h1>{{ resutMessage }}</h1>
    </div>
    <div v-else class="container mt-7">
      <div class="d-flex flex-row justify-content-around players">
        <div>
          <font-awesome-icon :icon="['fas', 'y']" beat />
          <font-awesome-icon :icon="['fas', 'o']" beat />
          <font-awesome-icon :icon="['fas', 'u']" beat />
        </div>
        <div>
          <font-awesome-icon :icon="['fas', 'm']" beat />
          <font-awesome-icon :icon="['fas', 'e']" beat />
        </div>
      </div>
      <div class="d-flex flex-row justify-content-evenly score mt-7">
        <div>
          <font-awesome-icon
            v-for="number in numberOfWinGames"
            :icon="['fas', number]"
            :key="number.id"
            bounce
          />
        </div>
        <div>
          <font-awesome-icon :icon="['fas', 'minus']" shake />
        </div>
        <div>
          <font-awesome-icon
            v-for="number in numberOfLooseGames"
            :icon="['fas', number]"
            :key="number.id"
            bounce
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoresView',
  data: () => ({
    gameList: [],
  }),
  computed: {
    isUserAuthorized() {
      return this.$store.getters.isUserAuthorized;
    },
    numberOfWinGames() {
      const resArray = this.gameList.filter(
        (game) => game.player_figure === game.winner
      );
      return resArray.length.toString().split('');
    },
    numberOfLooseGames() {
      const resArray = this.gameList.filter(
        (game) => game.player_figure !== game.winner && game.winner !== 'X0'
      );
      return resArray.length.toString().split('');
    },
    resutMessage() {
      if (!this.isUserAuthorized) {
        return 'Чтобы узнать счёт необходимо авторизоваться.';
      }
      if (this.gameList.length) {
        return '';
      }
      return 'У Вас нет сохранённых игр.';
    },
  },
  mounted() {
    this.getGameList();
  },
  methods: {
    getGameList() {
      if (this.isUserAuthorized) {
        this.$store.dispatch('fetchGamesList').then(() => {
          this.gameList = this.$store.getters.getGameList;
        });
      } else {
        this.gameList = this.$store.getters.getGameList; /// подумать
      }
    },
  },
  watch: {
    isUserAuthorized() {
      this.getGameList();
    },
  },
};
</script>

<style lang="scss" scoped>
.score .svg-inline--fa {
  height: 13em;
  color: orange;
}
.players .svg-inline--fa {
  height: 8em;
}
</style>
