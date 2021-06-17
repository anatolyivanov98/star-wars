<template>
  <div class="pagination">
    <button
        class="pagination__prev"
        :class="{ disabled: prevPage < 2 }"
        :disabled="prevPage < 2"
        @click="prevPageHandler"
    >
      <img src="../assets/arrow.svg" alt="Предыдущая">
    </button>
    <button
        class="pagination__next"
        :class="{ disabled: !nextPage }"
        :disabled="!nextPage"
        @click="nextPageHandler"
    >
      <img src="../assets/arrow.svg" alt="Следующая">
    </button>
  </div>
</template>

<script>
export default {
  name: "Paginate",
  props: ['prevPage','nextPage'],
  data() {
    return {

    }
  },
  methods: {
    prevPageHandler() {
      this.$emit('prevPageHandler')
    },
    nextPageHandler() {
      this.$emit('nextPageHandler')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./src/assets/scss/_variable";
@import "./src/assets/scss/mixins";

  .pagination {
    display: flex;

    button {
      @include btn(8px 20px);
      display: flex;
      justify-content: center;
      align-items: center;
      transition:.3s all ease;

      img {
        width: 35px;
      }
    }

    button:hover {
      border-color:$yellow;
      transition:.3s all ease
    }

    .pagination__prev {
      margin-right: 10px;
      img {
        transform: rotate(180deg);
      }
    }

    .disabled {
      background: $grey;
    }
  }

  @media (max-width: 500px) {
    .pagination {

      button {
        @include btn(6px 10px);

        img {
          width: 20px;
        }
      }
    }
  }
</style>