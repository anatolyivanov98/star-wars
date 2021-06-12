<template>
  <main class="main-favorite">
    <div class="favorite-carts">
      <FavoritePerson v-for="i in arrTest"/>
    </div>
  </main>
</template>

<script>
import FavoritePerson from "../components/FavoritePerson";
export default {
  name: "Favorite",
  data() {
    return {
      arrTest: [1,2,3,4,5,6,7,8,9,10]
    }
  },
  components: {FavoritePerson}
}
</script>

<style lang="scss" scoped>
  .main-favorite{

    .favorite-carts {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      padding: 20px 40px;
    }
  }

  @media (max-width: 500px) {
    .main-favorite {

      .favorite-carts {
        padding: 20px;
      }
    }
  }
</style>
