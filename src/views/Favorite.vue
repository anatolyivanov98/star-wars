<template>
  <main class="main-favorite">
    <div class="favorite-carts">
      <p
          v-if="!favoritePeopleArray.length"
          class="empty-text"
      >
        У вас нет избранных персонажей
      </p>
      <FavoritePerson
          v-else
          v-for="favoritePerson in favoritePeopleArray"
          :favoritePerson="favoritePerson"
          :key="favoritePerson.name"
          @removeFavoritePersonHandler="removeFavoritePerson"
      />
    </div>
  </main>
</template>

<script>
import FavoritePerson from "../components/FavoritePerson";
export default {
  name: "Favorite",
  components: {FavoritePerson},
  data() {
    return {
      favoritePeopleArray: []
    }
  },
  mounted() {
    this.favoritePeopleArray = JSON.parse(localStorage.getItem('favoritePeople')) || []

  },
  methods: {
    removeFavoritePerson(favoritePerson) {
      this.favoritePeopleArray = this.favoritePeopleArray.filter(item=> item.name !== favoritePerson.name)
      localStorage.setItem('favoritePeople', JSON.stringify(this.favoritePeopleArray))
    }
  }

}
</script>

<style lang="scss" scoped>

  .main-favorite{

    .favorite-carts {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      padding: 20px 40px;

      .empty-text {
        margin: 0 auto;
        font-size: 24px;
      }
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
