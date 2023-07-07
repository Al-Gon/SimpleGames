<template>
  <div class="container mt-7">
    <div class="d-flex flex-row justify-content-around dog-cat">
      <div>
        <font-awesome-icon :icon="['fas', 'dog']" style="color: #73524d" />
        <font-awesome-icon
          :icon="['fas', 'cat']"
          flip="horizontal"
          style="color: #919191"
        />
      </div>
    </div>
    <div class="d-flex flex-row justify-content-around mt-7 pet-project">
      <div>
        <font-awesome-icon :icon="['fas', 'p']" beat />
        <font-awesome-icon :icon="['fas', 'e']" beat />
        <font-awesome-icon :icon="['fas', 't']" beat />
      </div>
      <div>
        <font-awesome-icon :icon="['fas', 'p']" beat />
        <font-awesome-icon :icon="['fas', 'r']" beat />
        <font-awesome-icon :icon="['fas', 'o']" beat />
        <font-awesome-icon :icon="['fas', 'j']" beat />
        <font-awesome-icon :icon="['fas', 'e']" beat />
        <font-awesome-icon :icon="['fas', 'c']" beat />
        <font-awesome-icon :icon="['fas', 't']" beat />
      </div>
    </div>
    <div class="d-flex flex-row justify-content-center mt-7">
      <div><h3>lerning Vue.js</h3></div>
      <div>
        <img alt="logo" src="@\assets\logo.png" style="height: 3em" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.dog-cat .svg-inline--fa {
  height: 13em;
}
.pet-project .svg-inline--fa {
  color: orange;
  height: 8em;
}
</style>
