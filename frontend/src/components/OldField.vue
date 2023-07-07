<template>
  <div>
    <div class="container mt-5">
      <div>
        <table class="table table-bordered">
          <tbody>
            <tr v-for="(row, i) in currentField" :key="row.id">
              <td v-for="(el, j) in row" :key="el.id">
                <Cell
                  :id="item + i + j"
                  :player="currentField[i][j]"
                  :ref="getFieldCells"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Cell from '@/components/Cell.vue';

export default {
  name: 'OldField',
  components: {
    Cell,
  },
  props: {
    item: String,
    field: String,
    winner_cells: String,
  },
  computed: {
    currentField() {
      return JSON.parse(this.field);
    },
    currentWinnerCells() {
      return JSON.parse(this.winner_cells);
    },
  },
  mounted() {
    for (let i = 0; i < this.currentField.length; i++) {
      for (let j = 0; j < this.currentField.length; j++) {
        if (this.currentField[i][j]) {
          this.fieldCells[this.item + i + j].setValue(this.currentField[i][j]);
        }
      }
    }
    this.currentWinnerCells.forEach((key) => {
      this.fieldCells[this.item + key].isWinnerCell = true;
    });
  },
  data: () => ({
    fieldCells: {},
  }),
  methods: {
    getFieldCells(el) {
      if (el) {
        this.fieldCells[el.id] = el;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
