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
export default {
  name: "Favorite",
  components: {
    FavoritePerson,
    Filters
  },
  data() {
    return {
      favoritePeopleArray: [],
      filteredFavoritePeopleArray: [],
      filterName: '',
      filterGender: ''
    }
  },
  mounted() {
    this.favoritePeopleArray = JSON.parse(localStorage.getItem('favoritePeople')) || []
    this.filterPerson()
  },
  methods: {
    removeFavoritePerson(favoritePerson) {
      this.favoritePeopleArray = this.favoritePeopleArray.filter(item=> item.name !== favoritePerson.name)
      console.log(this.favoritePeopleArray)
      localStorage.setItem('favoritePeople', JSON.stringify(this.favoritePeopleArray))
      // this.favoritePeopleArray = JSON.parse(localStorage.getItem('favoritePeople')) || []
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

      if (this.filterName === '' && this.filterGender === 'all') {
        this.filteredFavoritePeopleArray = this.favoritePeopleArray
        return
      }

      if (this.filterName !== '' && this.filterGender === 'all') {
        this.filteredFavoritePeopleArray = this.favoritePeopleArray.filter(
            person => person.name.toLowerCase().includes(this.filterName.toLowerCase())
        )
        return
      }

      if (this.filterName === '' && this.filterGender !== 'all' && this.filterGender !== '') {
        this.filteredFavoritePeopleArray = this.favoritePeopleArray.filter(
            person => person.gender === this.filterGender
        )
        return
      }

      if (this.filterName && this.filterGender !== 'all') {
        this.filteredFavoritePeopleArray = this.favoritePeopleArray
            .filter(person => person.gender === this.filterGender)
            .filter(person => person.name.toLowerCase().includes(this.filterName.toLowerCase()))

        return
      }

      this.filteredFavoritePeopleArray = this.favoritePeopleArray
    }
  }

}
</script>

<style lang="scss" scoped>
@import "./src/assets/scss/_variable.scss";

  .main-favorite{

    .favorite-toolbar {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 20px 40px;
      box-shadow: 0 5px 5px $grey;
      flex-wrap: wrap;
    }

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
