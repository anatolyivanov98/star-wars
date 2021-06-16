<template>
  <main class="main">

    <div class="toolbar">
      <Paginate
        :prevPage="currentPage"
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
          v-for="person of paginatedPeople()"
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
      countPeople: 0,
      peopleArray: [],
      filteredPeople: [],
      testPagArr: [],
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
      this.isLoading = true
      const allPeople = []
      let page = this.currentPage
      await this.getPeople(this.currentPage)
      this.nextPage = this.getNextPage

      while (this.nextPage) {
        await this.getPeople(page)
        allPeople.push(this.getPeopleArray)
        page++
        this.nextPage = this.getNextPage
      }
      allPeople.forEach(arr => {
        arr.forEach(item => {
          this.peopleArray.push(item)
        })
      })
      this.countPeople = allPeople.length
      this.filterPerson()
      this.isLoading = false
    },
    async prevPageHandler() {
      this.currentPage--
    },
    async nextPageHandler() {
      this.currentPage++
    },
    filterPerson(filterName, filterGender) {
      this.currentPage = 1
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
    },
    paginatedPeople() {
      const start = (this.currentPage - 1) * 10
      const end = this.currentPage * 10
      this.nextPage = this.filteredPeople.length > end
      return this.filteredPeople.slice(start, end)
    }
  },
  computed: {
    ...mapGetters(['getPeopleArray', 'getNextPage'])
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
