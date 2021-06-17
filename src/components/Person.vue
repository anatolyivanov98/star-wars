<template>
  <div class="person">
    <img
        class="person__img"
        :src="`https://starwars-visualguide.com/assets/img/characters/${getPersonId}.jpg`"
        :alt="`${person.name}`"
    />
    <div class="person__block">
      <div class="person__block-info">
        <p>Name: {{ person.name }}</p>
        <p>Gender: {{ person.gender }}</p>
        <p>Homeworld: {{ homeworld.name }}</p>
      </div>
      <button class="person__block-btn" @click="addFavoritePersonHandler(person, homeworld.name)">
        <img :src="require(isFavorite ? '@/assets/like.svg' : '@/assets/unlike.svg')" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import peopleMixin from '@/mixins/people.mixin'

export default {
  name: "Person",
  props: ['person'],
  mixins: [peopleMixin],
  data() {
    return {
      homeworld: [],
      favoritePeople: []
    }
  },
  computed: {
    ...mapGetters(['getHomeworld']),
    getPersonId() {
      return this.personIdMixin(this.person)
    },
    isFavorite() {
      this.favoritePeople = this.getFavoritePeopleFromLocalStorageMixin()
      let flag = false;
      this.favoritePeople.forEach(item => {
        if (item.name.includes(this.person.name)) {
          flag = true;
        }
      });
      return flag
    }
  },
  methods: {
    ...mapActions(['getPersonHomeworld']),
    addFavoritePersonHandler(person, homeworld) {
      this.favoritePeople = this.getFavoritePeopleFromLocalStorageMixin()
      let flag = false;

      this.favoritePeople.forEach(item => {
        if (item.name.includes(person.name)) {
          flag = true;
        }
      });

      if (flag) {
        this.deleteFavoritePersonMixin(this.favoritePeople, person.name)

      } else {
        person.homeworld = homeworld
        this.favoritePeople.push(person)
        localStorage.setItem('favoritePeople', JSON.stringify(this.favoritePeople))
      }
    }
  },
  async created() {
    await this.getPersonHomeworld(this.person.homeworld)
    this.homeworld = this.getHomeworld
  }
}
</script>

<style lang="scss" scoped>
@import "./src/assets/scss/_variable";
@import "./src/assets/scss/mixins";

  .person {
    @include person(20px 48px, 270px);
  }

  .person:hover {
    box-shadow: 0 2px 8px 5px $green;
    transition:.3s all ease;

    .person__block {
      box-shadow: none;
      transition:.3s all ease;
    }
  }

@media (max-width: 1440px) {
  .person {
    @include person(20px 34px, 270px);
  }
}

@media (max-width: 1366px) {
  .person {
    @include person(20px 25px, 270px);
  }
}

@media (max-width: 768px) {
  .person {
    @include person(20px auto, 270px);
  }
}

@media (max-width: 500px) {
  .person {
    @include person(20px auto, 250px);
  }
}
</style>