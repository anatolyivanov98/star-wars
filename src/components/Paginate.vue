<template>
  <div class="pagination">
    <button
        class="pagination__prev"
        :class="{ disabled: !prevPage }"
        :disabled="!prevPage"
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
$grey: #cecece;
  .pagination {
    display: flex;

    button {
      border: 3px solid $grey;
      background: #fff;
      font-size: 18px;
      outline: none;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 20px;
      transition:.3s all ease;
      cursor: pointer;

      img {
        width: 35px;
      }
    }

    button:hover {
      border-color:#fecf3c;
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
        padding: 6px 10px;

        img {
          width: 20px;
        }
      }
    }
  }
</style>