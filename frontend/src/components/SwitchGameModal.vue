<template>
  <div
    id="modal"
    class="modal fade"
    data-bs-keyboard="false"
    tabindex="-1"
    style="display: none"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header justify-content-end">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="startNewGame"
          ></button>
        </div>
        <div class="modal-body">
          <h1>{{ getMessage() }}</h1>
          <h1>Congratulations !!</h1>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-warning"
            data-bs-dismiss="modal"
            @click="startNewGame"
          >
            Exit
          </button>

          <button
            type="button"
            class="btn btn-warning"
            data-bs-dismiss="modal"
            @click="startNewGameOldField"
          >
            New game with old field
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  name: 'SwitchGameModal',
  data: () => ({
    winner: null,
    player: null,
  }),
  methods: {
    show() {
      const modal = new Modal(document.getElementById('modal'));
      modal.show();
    },
    getMessage() {
      if (this.winner === 'X0') {
        return 'the game ended in a DRAW.';
      }
      if (this.winner === this.player) {
        return 'YOU are THE WINNER !!';
      }
      return 'I am THE WINNER !!';
    },
    startNewGameOldField() {
      this.$emit('getNewGameOldField', {});
    },
    startNewGame() {
      this.$emit('getNewGame', {});
    },
  },
};
</script>

<style lang="scss" scoped></style>
