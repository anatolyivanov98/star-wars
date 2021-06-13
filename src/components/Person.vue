<template>
  <div class="person">
    <img
        class="person__img"
        :src="`https://starwars-visualguide.com/assets/img/characters/${getPersonId}.jpg`"
        :alt="`${person.name}`"
    />
    <div class="person__block">
      <div class="person__block__info">
        <p>Name: {{ person.name }}</p>
        <p>Gender: {{ person.gender }}</p>
        <p>Homeworld: {{ homeworld.name }}</p>
      </div>
      <button class="person__block__btn" @click="addFavoritePersonHandler(person, homeworld.name)">
        <img :src="require(isFavorite ? '@/assets/like.svg' : '@/assets/unlike.svg')" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "Person",
  props: ['person'],
  data() {
    return {
      homeworld: [],
      favoritePeople: []
    }
  },
  computed: {
    ...mapGetters(['getHomeworld']),
    getPersonId() {
      const splitPersonUrl = this.person.url.split('/')
      const personId = splitPersonUrl[splitPersonUrl.length - 2]
      return personId
    },
    isFavorite() {
      this.favoritePeople = JSON.parse(localStorage.getItem('favoritePeople')) || []
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
      this.favoritePeople = JSON.parse(localStorage.getItem('favoritePeople')) || []

      let flag = false;
      this.favoritePeople.forEach(item => {
        if (item.name.includes(person.name)) {
          flag = true;
        }
      });

      if (flag) {
        this.favoritePeople = this.favoritePeople.filter(item=> item.name !== person.name)
        localStorage.setItem('favoritePeople', JSON.stringify(this.favoritePeople))
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
@import "./src/assets/scss/_variable.scss";

  .person {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 48px;
    transition:.3s all ease;

    .person__img {
      max-width: 270px;
    }

    .person__block {
      display: flex;
      justify-content: space-between;
      box-shadow: 0 4px 6px 2px $grey;
      transition:.3s all ease;
      width: 100%;

      .person__block__info {
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

      .person__block__btn {
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

      .person__block__btn:hover {
        box-shadow: 0 1px 3px 2px $yellow;
        transition:.3s all ease;

        img {
          width: 32px;
          transition:.3s all ease;
        }
      }

    }
  }

  .person:hover {
    box-shadow: 0 2px 8px 5px $green;
    transition:.3s all ease;

    .person__block {
      box-shadow: none;
      transition:.3s all ease;
    }
  }

  @media (max-width: 500px) {
    .person {
      .person__img {
        max-width: 250px;
      }
    }
  }

@media (max-width: 1440px) {
  .person {
    margin: 20px 34px;
  }
}

@media (max-width: 1366px) {
  .person {
    margin: 20px 25px;
  }
}

@media (max-width: 768px) {
  .person {
    margin: 20px auto;
  }
}
</style>