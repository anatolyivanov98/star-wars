<template>
  <main class="main">

    <div class="toolbar">
      <Paginate />
      <Filters />
    </div>

    <Preloader />

    <div class="carts">
      <Person v-for="item of arrTest" />
    </div>

  </main>
</template>

<script>
// @ is an alias to /src

import Preloader from "../components/Preloader";
import Paginate from "../components/Paginate";
import Filters from "../components/Filters";
import Person from "../components/Person";

export default {
  name: 'People',
  data() {
    return {
      arrTest: [1,2,3,4,5,6,7,8,9,10]
    }
  },
  components: {
    Person,
    Filters,
    Preloader,
    Paginate
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
