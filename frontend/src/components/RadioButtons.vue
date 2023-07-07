<template>
  <form>
    <div
      class="form-check form-check-inline"
      v-for="(option, index) in options"
      :key="option.value"
    >
      <input
        @change="changeSelected(index)"
        v-model="selected"
        :id="option.value"
        :value="option.value"
        :checked="option.checked"
        class="form-check-input"
        type="radio"
      />
      <label class="form-check-label" for="radio1">{{ option.text }}</label>
    </div>
  </form>
</template>

<script>
export default {
  name: 'RadioButtons',
  props: {
    inputOptions: Array,
  },
  data: () => ({
    selected: null,
    options: null,
  }),
  mounted() {
    this.options = this.inputOptions;
  },
  methods: {
    changeSelected(index) {
      this.options.forEach((option, ind) => {
        option.checked = ind === index;
      });
      this.$emit('changeSelectedValue', this.selected);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"></style>
