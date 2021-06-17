<template>
  <div class="person-favorite">
    <img class="person-favorite__img" :src="`https://starwars-visualguide.com/assets/img/characters/${getPersonId}.jpg`" />
    <div class="person-favorite__block">
      <div class="person-favorite__block-info">
        <p>Name: {{ favoritePerson.name }}</p>
        <p>Gender: {{ favoritePerson.gender }}</p>
        <p>Homeworld: {{ favoritePerson.homeworld }}</p>
      </div>
      <button class="person-favorite__block-btn" @click="removeFavoritePersonHandler">
        <img src="@/assets/like.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
import peopleMixin from '@/mixins/people.mixin'

export default {
  name: "FavoritePerson",
  props: ['favoritePerson'],
  mixins: [peopleMixin],
  computed: {
    getPersonId() {
      return this.personIdMixin(this.favoritePerson)
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
@import "./src/assets/scss/mixins";

.person-favorite {
  @include person(20px 48px, 270px);
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
    @include person(20px 34px, 270px);
  }
}

@media (max-width: 1366px) {
  .person-favorite {
    @include person(20px 25px, 270px);
  }
}

@media (max-width: 768px) {
  @include person(20px auto, 270px);
}

@media (max-width: 500px) {
  .person-favorite {
    @include person(20px auto, 250px);
  }
}
</style>