<template>
  <main class="main">

    <div class="toolbar">
      <Paginate
        :prevPage="prevPage"
        :nextPage="nextPage"
        @prevPageHandler="prevPageHandler()"
        @nextPageHandler="nextPageHandler()"
      />
      <Filters
        @filterPersonHandler="filterPerson"
      />
    </div>

    <Preloader v-if="isLoading"/>

    <div v-else class="carts">
      <p
          class="empty-text"
          v-if="!filteredPeople.length"
      >
        Нет подходящих результатов
      </p>
      <Person
          v-else
          v-for="person of filteredPeople"
          :person="person"
          :key="person.name"
      />
    </div>

  </main>
</template>

<script>

import Preloader from "../components/Preloader";
import Paginate from "../components/Paginate";
import Filters from "../components/Filters";
import Person from "../components/Person";

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'People',
  data() {
    return {
      peopleArray: [],
      filteredPeople: [],
      currentPage: 1,
      isLoading: true,
      prevPage: '',
      nextPage: '',
      filterName: '',
      filterGender: ''
    }
  },
  components: {
    Person,
    Filters,
    Preloader,
    Paginate
  },
  methods: {
    ...mapActions(['getPeople']),
    async getPeopleData() {
      this.isLoading = true,
      await this.getPeople(this.currentPage)
      this.peopleArray = this.getPeopleArray
      this.prevPage = this.getPrevPage
      this.nextPage = this.getNextPage
      this.filterPerson()
      this.isLoading = false
    },
    async prevPageHandler() {
      this.currentPage = this.currentPage - 1
      await this.getPeopleData()
    },
    async nextPageHandler() {
      this.currentPage = this.currentPage + 1
      await this.getPeopleData()
    },
    filterPerson(filterName, filterGender) {
      if (filterName !== undefined) {
        this.filterName = filterName
      }
      if (filterGender !== undefined) {
        this.filterGender = filterGender
      }

      if (this.filterName === '' && this.filterGender === 'all') {
        this.filteredPeople = this.peopleArray
        return
      }

      if (this.filterName !== '' && this.filterGender === 'all') {
        this.filteredPeople = this.peopleArray.filter(person => person.name.toLowerCase().includes(this.filterName.toLowerCase()))
        return
      }

      if (this.filterName === '' && this.filterGender !== 'all' && this.filterGender !== '') {
        this.filteredPeople = this.peopleArray.filter(person => person.gender === this.filterGender)
        return
      }

      if (this.filterName && this.filterGender !== 'all') {
        this.filteredPeople = this.peopleArray
            .filter(person => person.gender === this.filterGender)
            .filter(person => person.name.toLowerCase().includes(this.filterName.toLowerCase()))

        return
      }

      this.filteredPeople = this.peopleArray
    }
  },
  computed: {
    ...mapGetters(['getPeopleArray', 'getPrevPage', 'getNextPage'])
  },
  async mounted() {
    await this.getPeopleData()
  }
}
</script>

<style lang="scss" scoped>
@import "./src/assets/scss/_variable.scss";

  .main {

    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 40px;
      box-shadow: 0 5px 5px $grey;
      flex-wrap: wrap;
    }

    .carts {
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
    .main {
      .toolbar {
        padding: 20px;
      }
      .carts {
        padding: 20px;
      }
    }
  }
</style>
