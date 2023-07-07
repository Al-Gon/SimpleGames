<template>
  <ul class="pagination justify-content-center">
    <li v-if="page > 1" class="page-item">
      <button @click="page -= 1" class="page-link rounded-circle">
        <font-awesome-icon :icon="['fas', 'angle-left']" />
      </button>
    </li>
    <li
      v-if="centerPagesNumbers[0] !== 1"
      class="page-item"
      :class="{ active: page === 1 }"
    >
      <button @click="page = 1" class="page-link rounded-circle">1</button>
    </li>
    <li
      v-if="centerPagesNumbers.at(0) > pagesNumbers.at(1)"
      class="page-ellipsis"
    >
      ...
    </li>
    <li
      v-for="number in centerPagesNumbers"
      :key="number.id"
      class="page-item"
      :class="{ active: page === number }"
    >
      <button @click="page = number" class="page-link rounded-circle">
        {{ number }}
      </button>
    </li>
    <li
      v-if="centerPagesNumbers.at(-1) < pagesNumbers.at(-2)"
      class="page-ellipsis"
    >
      ...
    </li>
    <li
      v-if="centerPagesNumbers.at(-1) !== pagesNumbers.at(-1)"
      class="page-item"
      :class="{ active: page === pagesNumbers.at(-1) }"
    >
      <button
        @click="page = pagesNumbers.at(-1)"
        class="page-link rounded-circle"
      >
        {{ pagesNumbers.at(-1) }}
      </button>
    </li>
    <li v-if="hasNextPage" class="page-item">
      <button @click="page += 1" class="page-link rounded-circle">
        <font-awesome-icon :icon="['fas', 'angle-right']" />
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    offsetPageSetting: Number,
    filteredListLength: Number,
  },
  data: () => ({
    page: null,
  }),
  computed: {
    pagesNumbers() {
      const length = Math.ceil(this.filteredListLength / 2);
      return Array.from({ length }, (_, ind) => ind + 1);
    },
    centerPagesNumbers() {
      const start =
        this.page - this.offsetPageSetting - 1 > 0
          ? this.page - this.offsetPageSetting - 1
          : 0;
      const end =
        this.page + this.offsetPageSetting > this.pagesNumbers.length
          ? this.pagesNumbers.length
          : this.page + this.offsetPageSetting;
      return this.pagesNumbers.slice(start, end);
    },
    hasNextPage() {
      return this.page < this.pagesNumbers.at(-1);
    },
  },
  methods: {
    getStartEnd() {
      const start = (this.page - 1) * 2;
      const end = this.page * 2;
      return [start, end];
    },
    setPage(page) {
      this.page = page;
    },
  },
  watch: {
    page() {
      this.$emit('changePageNumber', {
        startEnd: this.getStartEnd(),
        page: this.page,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
