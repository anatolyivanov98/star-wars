<template>
  <div class="default">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  name: 'DefaultLayout',
  components: {
    Header
  }
}
</script>
