<template>
  <div class="person-favorite">
    <img class="person-favorite__img" src="https://starwars-visualguide.com/assets/img/characters/1.jpg" />
    <div class="person-favorite__block">
      <div class="person-favorite__block__info">
        <p>Name: test</p>
        <p>Gender: test</p>
        <p>Homeworld: test</p>
      </div>
      <button class="person-favorite__block__btn">
        <img src="@/assets/like.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FavoritePerson"
}
</script>

<style lang="scss" scoped>
$grey: #cecece;

.person-favorite {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  transition:.3s all ease;

  .person-favorite__img {
    max-width: 270px;
  }

  .person-favorite__block {
    display: flex;
    justify-content: space-between;
    box-shadow: 0 4px 6px 2px $grey;
    transition:.3s all ease;

    .person-favorite__block__info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      padding: 5px 10px;

      p {
        margin: 0;
        padding: 0;
        font-size: 18px
      }
    }

    .person-favorite__block__btn {
      border-bottom:  none;
      border-top: none;
      border-right: none;
      border-left: 2px solid $grey;
      background: #fff;
      cursor: pointer;
      outline: none;
      transition:.3s all ease;

      img {
        width: 30px;
        transition:.3s all ease;
      }
    }

    .person-favorite__block__btn:hover {
      box-shadow: 0 1px 3px 2px #fecf3d;
      transition:.3s all ease;

      img {
        width: 32px;
        transition:.3s all ease;
      }
    }

  }
}

.person-favorite:hover {
  box-shadow: 0 2px 8px 5px #388e3c;
  transition:.3s all ease;

  .person-favorite__block {
    box-shadow: none;
    transition:.3s all ease;
  }
}
</style>