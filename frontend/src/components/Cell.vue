<template>
  <div>
    <select
      :id="id"
      v-on:change="checkCellValue"
      v-model="cellValue"
      class="form-select"
      :class="{ winner_cell: isWinnerCell }"
      aria-label="Default select example"
    >
      <option
        v-for="option in options"
        :key="option.key"
        :value="option.value"
        :selected="option.selected"
        :disabled="option.disabled"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'NewCell',
  props: {
    id: String,
    player: String,
  },
  data: () => ({
    cellValue: '',
    options: {
      option1: {
        value: '',
        disabled: true,
        selected: true,
        text: 'Open',
      },
      option2: {
        value: null,
        disabled: false,
        selected: false,
        text: null,
      },
    },
    isWinnerCell: false,
  }),
  mounted() {
    this.resetOptions(this.player);
  },

  methods: {
    resetOptions(value) {
      this.options.option2.value = value;
      this.options.option2.text = value;
    },
    resetValue(value = '', player = this.player) {
      if (this.cellValue) {
        this.cellValue = value;
        this.resetOptions(player);
        this.isWinnerCell = false;
      }
    },
    setValue(value) {
      this.cellValue = value;
    },
    setMove() {
      const figure = this.player === 'X' ? '0' : 'X';
      this.setValue(figure);
      this.resetOptions(figure);
      // setTimeout(() => {
      //   this.options.option1.selected = false;
      //   this.options.option2.selected = true;
      //   this.options.option1.disabled = true;
      // }, 0);
    },
    checkCellValue() {
      this.$emit('getCellValue', {
        cellValue: this.cellValue,
        id: this.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.winner_cell {
  color: red;
  text: bold;
}
</style>
