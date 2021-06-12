<template>
  <div class="filters">
    <div class="filters__filter">
      <input
          class="filters__filter__name"
          type="text"
          placeholder="Введите имя..."
      >
    </div>
    <div class="filters__filter">
      <div class="filters__filter">
        <select class="filters__filter__gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="female">n/a</option>
        </select>
        <button class="green__btn">Применить</button>
        <button class="red__btn">Сбросить фильтры</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Filters"
}
</script>

<style lang="scss" scoped>
$grey: #cecece;
  .filters {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    .filters__filter {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 0 10px 40px;

      button {
        border: 3px solid $grey;
        padding: 10px 20px;
        background: #ffffff;
        font-size: 18px;
        color: #000;
        margin-left: 10px;
        cursor: pointer;
        outline: none;
      }

      .green__btn {
        border: 3px solid #388e3c;
        color: #ffffff;
        background: #388e3c;
      }

      .red__btn {
        border: 3px solid #c62828 ;
        color: #ffffff;
        background: #c62828 ;
      }

      .filters__filter__name {
        font-size: 18px;
        color: #000;
        padding: 10px;
        outline: none;
        border: 3px solid $grey;
      }

      .filters__filter__gender {
        font-size: 18px;
        color: #000;
        padding: 10px;
        outline: none;
        border: 3px solid $grey;
        background: #ffffff;
      }
    }
  }
</style>