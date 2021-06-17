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

import peopleMixin from '@/mixins/people.mixin'

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
  mixins: [peopleMixin],
  methods: {
    ...mapActions(['getPeople']),
    async getPeopleData() {
      this.isLoading = true
      const allPeople = []
      let page = this.currentPage
      await this.getPeople(this.currentPage)
      let nextPage = this.getNextPage

      while (nextPage) {
        await this.getPeople(page)
        allPeople.push(this.getPeopleArray)
        page++
        nextPage = this.getNextPage
      }

      allPeople.forEach(arr => {
        arr.forEach(item => {
          this.peopleArray.push(item)
        })
      })

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

      this.filteredPeople = this.filterPeopleMixin(this.filterName, this.filterGender, this.peopleArray)
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
@import "./src/assets/scss/_variable";
@import "./src/assets/scss/mixins";

  .main {

    .toolbar {
      @include toolbar(space-between, 20px 40px);
    }

    .carts {
      @include carts(20px 40px);
    }
  }

  @media (max-width: 500px) {
    .main {
      .toolbar {
        @include toolbar(space-between, 20px);
      }
      .carts {
        @include carts(20px);
      }
    }
  }
</style>
