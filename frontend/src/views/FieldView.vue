<template>
  <div>
    <div>
      <div class="container mt-7">
        <div>
          <table class="table table-bordered">
            <tbody>
              <tr v-for="(row, i) in gameField" :key="row.id">
                <td v-for="(el, j) in row" :key="el.id">
                  <Cell
                    @getCellValue="onYouMakeMove"
                    :id="'' + i + j"
                    :player="player"
                    :ref="getFieldCells"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="container mt-5">
        <div>
          <button
            @click="undoPreviousMove"
            type="button"
            class="btn btn-primary"
          >
            Отменить предыдущий ход
          </button>
        </div>
      </div>
      <SwitchGameModal
        @getNewGameOldField="onStartNewGameOldField"
        @getNewGame="onStartNewGame"
        ref="modal"
      />
    </div>
  </div>
</template>

<script>
import Cell from '@/components/Cell.vue';
import SwitchGameModal from '@/components/SwitchGameModal.vue';
import {
  getIndex,
  checkWinner,
  checkDraw,
  getChoosenKey,
} from '@/helpers/logic';

export default {
  name: 'FieldView',
  components: {
    Cell,
    SwitchGameModal,
  },
  computed: {
    isUserAuthorized() {
      return this.$store.getters.isUserAuthorized;
    },
    fieldType: {
      get() {
        return this.gameField;
      },
      set(fieldsize) {
        this.gameField = fieldsize
          ? Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => ''))
          : Array.from({ length: 5 }, () =>
              Array.from({ length: 5 }, () => '')
            );
      },
    },
    player() {
      return +this.$route.params.player ? 'X' : '0';
    },
    nextPlayer() {
      return this.currentPlayer === 'X' ? '0' : 'X';
    },
    allGameStates() {
      return this.$store.getters.allGameStates.length;
    },
  },
  data: () => ({
    gameField: null,
    winner: null,
    winnerCells: [],
    fieldCells: {},
    currentPlayer: '',
  }),
  mounted() {
    this.fieldType = +this.$route.params.fieldsize;
    this.currentPlayer = this.player;
    this.$store.commit('refreshGameState', this.gameField);
    setTimeout(() => {
      if (this.currentPlayer === '0') this.currentPlayer = 'X';
    }, 0);
  },
  methods: {
    undoPreviousMove() {
      if (this.allGameStates > 1) {
        this.$store.commit('deleteLastState');
        this.gameField = this.$store.getters.getLastState;

        for (let i = 0; i < this.gameField.length; i++) {
          for (let j = 0; j < this.gameField.length; j++) {
            if (this.gameField[i][j]) {
              this.fieldCells[`${i}${j}`].resetValue(
                this.gameField[i][j],
                this.gameField[i][j]
              );
            } else {
              this.fieldCells[`${i}${j}`].resetValue(
                this.gameField[i][j],
                this.player
              );
            }
          }
        }
      }
    },
    refreshGameField(key) {
      const [x, y] = getIndex(key);
      this.gameField[x][y] = this.fieldCells[key].cellValue;
    },
    getFieldCells(el) {
      if (el) {
        this.fieldCells[el.id] = el;
      }
    },
    showWinner(winner, winnerLine = null) {
      if (winnerLine) {
        winnerLine.forEach((el) => {
          const key = `${el[0]}${el[1]}`;
          this.winnerCells.push(key);
          this.fieldCells[key].isWinnerCell = true;
        });
      }
      this.winner = winner;
      this.$refs.modal.winner = winner;
      this.$refs.modal.player = this.player;
      this.$refs.modal.show();
    },
    handleMove(cellId, cellValue) {
      this.refreshGameField(cellId);

      if (this.player !== this.currentPlayer) {
        this.$store.commit('pushGameState', this.gameField);
      }

      const winnerLine = checkWinner(this.gameField, cellId, cellValue);
      if (winnerLine.length) {
        this.showWinner(cellValue, winnerLine);
      } else {
        this.currentPlayer = this.nextPlayer;
      }
    },
    onImakeMove() {
      const choosenCell = this.fieldCells[getChoosenKey(this.gameField)];
      choosenCell.setMove();
      this.handleMove(choosenCell.id, choosenCell.cellValue);
    },
    onYouMakeMove(data) {
      this.handleMove(data.id, data.cellValue);
    },
    saveGame() {
      const transferGame = {
        game_field: JSON.stringify(this.gameField),
        player_figure: this.player,
        winner: this.winner,
        winner_cells: JSON.stringify(this.winnerCells),
      };
      this.$store.dispatch('addGameInGameList', transferGame);
    },
    onStartNewGame() {
      if (this.isUserAuthorized) {
        this.saveGame();
      }
      this.$router.push('/tictactoe');
    },
    onStartNewGameOldField() {
      if (this.isUserAuthorized) {
        this.saveGame();
      }
      this.fieldType = +this.$route.params.fieldsize;
      this.winnerCells = [];
      this.winner = null;
      Object.keys(this.fieldCells).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(this.fieldCells, key)) {
          this.fieldCells[key].resetValue();
        }
      });
      this.$store.commit('refreshGameState', this.gameField);
    },
  },
  watch: {
    currentPlayer() {
      if (checkDraw(this.gameField)) {
        this.showWinner('X0');
      } else if (this.currentPlayer !== this.player) {
        this.onImakeMove();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
