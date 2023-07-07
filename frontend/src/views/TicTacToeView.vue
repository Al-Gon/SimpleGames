<template>
  <div class="mt-6">
    <TicTacToe />
  </div>
</template>

<script>
import TicTacToe from '@/components/TicTacToe.vue';

export default {
  name: 'TicTacToeView',
  components: {
    TicTacToe,
  },
};
</script>

<style lang="scss" scoped></style>
