<template>
  <div class="person-favorite">
    <img class="person-favorite__img" :src="`https://starwars-visualguide.com/assets/img/characters/${getPersonId}.jpg`" />
    <div class="person-favorite__block">
      <div class="person-favorite__block__info">
        <p>Name: {{ favoritePerson.name }}</p>
        <p>Gender: {{ favoritePerson.gender }}</p>
        <p>Homeworld: {{ favoritePerson.homeworld }}</p>
      </div>
      <button class="person-favorite__block__btn" @click="removeFavoritePersonHandler">
        <img src="@/assets/like.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FavoritePerson",
  props: ['favoritePerson'],
  computed: {
    getPersonId() {
      const splitPersonUrl = this.favoritePerson.url.split('/')
      const personId = splitPersonUrl[splitPersonUrl.length - 2]
      return personId
    }
  },
  methods: {
    removeFavoritePersonHandler() {
      this.$emit('removeFavoritePersonHandler', this.favoritePerson)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./src/assets/scss/_variable.scss";

.person-favorite {
  display: flex;
  flex-direction: column;
  margin: 20px 48px;
  transition:.3s all ease;
  align-items: center;

  .person-favorite__img {
    max-width: 270px;
  }

  .person-favorite__block {
    display: flex;
    justify-content: space-between;
    box-shadow: 0 4px 6px 2px $grey;
    transition:.3s all ease;
    width: 100%;

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
      box-shadow: 0 1px 3px 2px $yellow;
      transition:.3s all ease;

      img {
        width: 32px;
        transition:.3s all ease;
      }
    }

  }
}

.person-favorite:hover {
  box-shadow: 0 2px 8px 5px $green;
  transition:.3s all ease;

  .person-favorite__block {
    box-shadow: none;
    transition:.3s all ease;
  }
}

@media (max-width: 1440px) {
  .person-favorite {
    margin: 20px 34px;
  }
}

@media (max-width: 1366px) {
  .person-favorite {
    margin: 20px 25px;
  }
}

@media (max-width: 768px) {
  .person-favorite {
    margin: 20px auto;
  }
}
</style>