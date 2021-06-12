<template>
  <main class="main">

    <div class="toolbar">
      <Paginate
        :prevPage="prevPage"
        :nextPage="nextPage"
        @prevPageHandler="prevPageHandler()"
        @nextPageHandler="nextPageHandler()"
      />
      <Filters />
    </div>

    <Preloader v-if="isLoading"/>

    <div
      v-else
      class="carts"
    >
      <Person
          v-for="person of peopleArray"
          :person="person"
          :key="person.name"
      />
    </div>

  </main>
</template>

<script>
// @ is an alias to /src

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
      currentPage: 1,
      isLoading: true,
      prevPage: '',
      nextPage: ''
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
      this.isLoading = false
    },
    async prevPageHandler() {
      this.currentPage = this.currentPage - 1
      await this.getPeopleData()
    },
    async nextPageHandler() {
      this.currentPage = this.currentPage + 1
      await this.getPeopleData()
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
$grey: #cecece;

  .main {

    .toolbar {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 20px 40px;
      box-shadow: 0 5px 5px $grey;
      flex-wrap: wrap;
    }

    .carts {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      padding: 20px 40px;
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
