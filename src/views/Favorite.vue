<template>
  <main class="main-favorite">
    <div class="favorite-toolbar">
      <Filters
          @filterPersonHandler="filterPerson"
      />
    </div>
    <div class="favorite-carts">
      <p
          v-if="!filteredFavoritePeopleArray.length && !favoritePeopleArray.length"
          class="empty-text"
      >
        У вас нет избранных персонажей
      </p>
      <p
          v-else-if="!filteredFavoritePeopleArray.length && favoritePeopleArray.length"
          class="empty-text"
      >
        Нет подходящих результатов
      </p>
      <FavoritePerson
          v-else
          v-for="favoritePerson in filteredFavoritePeopleArray"
          :favoritePerson="favoritePerson"
          :key="favoritePerson.name"
          @removeFavoritePersonHandler="removeFavoritePerson"
      />
    </div>
  </main>
</template>

<script>
import FavoritePerson from "../components/FavoritePerson";
import Filters from "../components/Filters";

import peopleMixin from '@/mixins/people.mixin'

export default {
  name: "Favorite",
  components: {
    FavoritePerson,
    Filters
  },
  mixins: [peopleMixin],
  data() {
    return {
      favoritePeopleArray: [],
      filteredFavoritePeopleArray: [],
      filterName: '',
      filterGender: ''
    }
  },
  mounted() {
    this.favoritePeopleArray = this.getFavoritePeopleFromLocalStorageMixin()
    this.filterPerson()
  },
  methods: {
    removeFavoritePerson(favoritePerson) {
      this.favoritePeopleArray = this.deleteFavoritePersonMixin(this.favoritePeopleArray, favoritePerson.name)
      this.filteredFavoritePeopleArray = this.favoritePeopleArray
      this.filterPerson()
    },
    filterPerson(filterName, filterGender) {
      if (filterName !== undefined) {
        this.filterName = filterName
      }
      if (filterGender !== undefined) {
        this.filterGender = filterGender
      }
      this.filteredFavoritePeopleArray = this.filterPeopleMixin(this.filterName, this.filterGender,
          this.favoritePeopleArray)
    }
  }

}
</script>

<style lang="scss" scoped>
@import "./src/assets/scss/_variable";
@import "./src/assets/scss/mixins";

  .main-favorite{

    .favorite-toolbar {
      @include toolbar(flex-end, 20px 40px);
    }

    .favorite-carts {
      @include carts(20px 40px);
    }
  }

  @media (max-width: 500px) {
    .main-favorite {
      .favorite-toolbar {
        @include toolbar(flex-end, 20px);
      }
      .favorite-carts {
        @include carts(20px);
      }
    }
  }
</style>
