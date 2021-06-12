<template>
  <div class="preloader">
    <img src="../assets/preload.svg" alt="Загрузка">
  </div>
</template>

<script>
export default {
  name: 'Preloader'
}
</script>

<style lang="scss" scoped>
.preloader{
  position: relative;
  height: 75vh;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: 150px;
    transform: translate(-50%, -50%);
  }
}
</style>