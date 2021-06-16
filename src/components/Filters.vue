<template>
  <div class="filters">
    <div class="filters__filter">
      <input
          class="filters__filter-name"
          type="text"
          placeholder="Введите имя..."
          v-model="filterName"
          @input="filterPersonHandler"
      >
    </div>
    <div class="filters__filter">
      <select class="filters__filter-gender"
              v-model="filterGender"
              @change="filterPersonHandler"
      >
        <option value="all" selected>All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="n/a">n/a</option>
        <option value="none">None</option>
        <option value="hermaphrodite">Hermaphrodite</option>
      </select>
      <button class="red-btn" @click="resetFilterPersonHandler">Сбросить фильтры</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Filters",
  data() {
    return {
      filterName: '',
      filterGender: 'all'
    }
  },
  methods: {
    filterPersonHandler() {
      this.$emit('filterPersonHandler', this.filterName, this.filterGender)
    },
    resetFilterPersonHandler() {
      this.filterName = ''
      this.filterGender = 'all'
      this.filterPersonHandler()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./src/assets/scss/_variable.scss";

  .filters {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    .filters__filter {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 0 10px 20px;

      button {
        border: 3px solid $grey;
        padding: 10px 20px;
        background: #ffffff;
        font-size: 18px;
        color: #000;
        margin-left: 20px;
        cursor: pointer;
        outline: none;
      }

      .red-btn {
        border: 3px solid $red ;
        color: #ffffff;
        background: $red ;
      }

      .filters__filter-name {
        font-size: 18px;
        color: #000;
        padding: 10px;
        outline: none;
        border: 3px solid $grey;
      }

      .filters__filter-gender {
        font-size: 18px;
        color: #000;
        padding: 10px;
        outline: none;
        border: 3px solid $grey;
        background: #ffffff;
      }
    }
  }

@media (max-width: 500px) {
  .filters {
    justify-content: flex-start;

    .filters__filter {
      padding: 10px 0;

      button {
        margin-left: 10px;
        font-size: 16px;
        padding: 3px 12px;
      }
    }
  }
}
</style>