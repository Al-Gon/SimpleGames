<template>
  <div>
    <div v-if="resutMessage === ''" class="container mt-5">
      <RadioButtons
        @changeSelectedValue="setFilterKey"
        :inputOptions="[
          { value: 'showAllGames', text: 'Все игры', checked: true },
          { value: 'showWinGames', text: 'Вы победили', checked: false },
          { value: 'showLooseGames', text: 'Вы проиграли', checked: false },
          { value: 'showDrawGames', text: 'Ничья', checked: false },
        ]"
      />
      <div
        v-for="(gameItem, index) in getCurrentPageGames()"
        :key="gameItem.pk"
        class="container mt-5"
      >
        <hr />
        <div>
          <p>
            Дата игры: {{ gameItem['game_date'] }}, Время игры:
            {{ gameItem['game_time'] }}, Ваша фигура:
            {{ gameItem['player_figure'] }}, Победитель:
            {{ gameItem['winner'] }}
          </p>
        </div>

        <OldField
          :field="gameItem.game_field"
          :item="'' + index"
          :winner_cells="gameItem.winner_cells"
        />
      </div>
      <div class="container mt-5">
        <Pagination
          @changePageNumber="setStartEnd"
          :offsetPageSetting="1"
          :filteredListLength="filteredList.length"
          ref="pagination"
        />
      </div>
    </div>
    <div v-else class="container mt-5">
      <h1>{{ resutMessage }}</h1>
    </div>
  </div>
</template>

<script>
import OldField from '@/components/OldField.vue';
import RadioButtons from '@/components/RadioButtons.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'OldFieldsView',
  components: {
    OldField,
    RadioButtons,
    Pagination,
  },
  data: () => ({
    filteredList: [],
    gameList: [],
    // resutMessage: '',
    filterKey: '',
    page: null,
    startEnd: [],
  }),
  computed: {
    isUserAuthorized() {
      return this.$store.getters.isUserAuthorized;
    },
    filter() {
      return {
        showWinGames: this.gameList.filter(
          (game) => game.player_figure === game.winner
        ),
        showLooseGames: this.gameList.filter(
          (game) => game.player_figure !== game.winner && game.winner !== 'X0'
        ),
        showDrawGames: this.gameList.filter((game) => game.winner === 'X0'),
        showAllGames: this.gameList,
      };
    },
    resutMessage() {
      if (!this.isUserAuthorized) {
        return 'Чтобы сохранять игры необходимо авторизоваться.';
      }
      // if (this.gameList.length === 0) {
      //   return 'У вас нет сохранённых игр.';
      // }
      return '';
    },
  },
  mounted() {
    // срабатывает при загрузке и не срабатывает когда открыта страница
    // определяются  this.filterKey и this.page = 1
    if (this.isUserAuthorized) {
      this.setGameList();
      const windowData = Object.fromEntries(
        new URL(window.location).searchParams.entries()
      );
      if (windowData.filter) {
        this.filterKey = windowData.filter;
      }
      if (windowData.page) {
        this.$refs.pagination.setPage(+windowData.page);
      } else {
        this.$refs.pagination.setPage(1);
      }
    }
  },
  methods: {
    setFilterKey(condition) {
      this.filterKey = condition;
    },

    setFilteredList(filterKey) {
      this.filteredList = this.filter[filterKey];
    },
    setStartEnd(data) {
      this.page = data.page;
      this.startEnd = data.startEnd;
    },
    getCurrentPageGames() {
      const [start, end] = this.startEnd;
      return this.filteredList.slice(start, end);
    },
    setGameList() {
      this.$store.dispatch('fetchGamesList').then(() => {
        this.gameList = this.$store.getters.getGameList;
      });
    },
  },
  watch: {
    isUserAuthorized() {    // срабатывает при открытой странице после авторизации и при выходе
      if (this.isUserAuthorized) {
        this.setGameList();
      } else {
        this.gameList = [];
      }
    },
    // срабатывает при изменениии и при this.filterKey === ''
    gameList() {
      if (this.gameList.length && this.filterKey === '') {
        this.filterKey = 'showAllGames';
      }
    },
    // срабатывает при изменениии и при this.filterKey и если при этом не менялась страница
    filterKey() {
      if (this.isUserAuthorized) {
        this.setFilteredList(this.filterKey);
        this.$refs.pagination.setPage(1);
        window.history.pushState(
          null,
          document.title,
          `${window.location.pathname}?filter=${this.filterKey}&page=${this.page}`
        );
      }
    },
    // срабатывает при изменениии страницы
    page() {
      if (this.isUserAuthorized) {
        window.history.pushState(
          null,
          document.title,
          `${window.location.pathname}?filter=${this.filterKey}&page=${this.page}`
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
