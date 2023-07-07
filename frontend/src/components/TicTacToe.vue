<template>
  <div class="container">
    <form>
      <div class="row row-cols-auto g-3 align-items-center">
        <div class="col-6">
          <h3>Выберите чем вы будите ходить?</h3>
        </div>
        <div class="col-6">
          <label class="visually-hidden" for="inlineForm">Preference</label>
          <select class="form-select" id="inlineForm" v-model="player">
            <option value="" selected>Ничего не выбранно...</option>
            <option value="1">Крестик</option>
            <option value="0">Нолик</option>
          </select>
        </div>
      </div>
      <div class="row row-cols-auto g-3 align-items-center my-5">
        <div class="col-6">
          <h3>Выберите размер поля?</h3>
        </div>
        <div class="col-6">
          <label class="visually-hidden" for="inlineForm">Preference</label>
          <select class="form-select" id="inlineForm" v-model="fieldSize">
            <option value="" selected>Ничего не выбранно...</option>
            <option value="1">3 X 3</option>
            <option value="0">5 X 5</option>
          </select>
        </div>
      </div>
      <div class="row row-cols-auto g-3 align-items-center my-5">
        <div class="col-12">
          <button type="button" class="btn btn-warning" @click="clickButton">
            Начать игру
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'TicTacToe',
  data: () => ({
    player: '',
    fieldSize: '',
  }),
  methods: {
    clickButton() {
      if (this.player && this.fieldSize) {
        this.$router.push(`tictactoe/field/${this.player}/${this.fieldSize}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
