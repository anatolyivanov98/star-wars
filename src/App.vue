<template>
  <div id="app">
    <component :is="layout" />
  </div>
</template>

<script>
import DefaultLayout from "./layouts/DefaultLayout";

export default {
  components: {
    DefaultLayout
  },
  computed: {
    layout() {
      return this.$route.meta.layout + '-layout'
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
}
</style>
