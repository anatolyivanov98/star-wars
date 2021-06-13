<template>
  <header class="header">
    <nav class="header__nav">
      <router-link class="header__nav__link" to="/">Главная</router-link>
      <router-link class="header__nav__link" :to="{name: 'Favorite'}">
        Избранные персонажи
      </router-link>
    </nav>
    <img class="header__logo" src="@/assets/logo.svg" alt="Логотип">
  </header>
</template>

<script>

export default {
  name: "Header",
}
</script>

<style lang="scss" scoped>
@import "./src/assets/scss/_variable.scss";

  .header {
    width: 100%;
    height: 70px;
    border-bottom: 3px solid $grey;
    display: flex;
    justify-content: space-between;

    .header__nav {
      display: flex;
      align-items: center;

      .header__nav__link {
        font-size: 18px;
        text-decoration: none;
        color: #000;
        height: 100%;
        padding: 5px 25px;
        border-right: 2px solid $grey;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;
        transition:.3s all ease
      }

      .header__nav__link:hover {
        box-shadow: 0 3px 0 $yellow;
        transition:.3s all ease
      }

    }

    .header__logo {
      padding: 5px 20px 5px 5px;
    }
  }

  @media (max-width: 500px) {
    .header {
      .header__logo {
        display: none;
      }

      .header__nav {
        width: 100%;

        .header__nav__link {
          width: 50%;
        }

        .header__nav__link:last-child {
          border: none;
        }
      }
    }
  }
</style>