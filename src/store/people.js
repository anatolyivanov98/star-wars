import axios from "axios";

export default {
  state: {
    peopleArray: [],
    prevPage: false,
    nextPage: true,
    homeworld: []
  },
  mutations: {
    setPeopleArray(state, array) {
      state.peopleArray = array
    },
    setPrevPage(state, prevPage) {
      if (prevPage) {
        state.prevPage = true
      } else {
        state.prevPage = false
      }
    },
    setNextPage(state, nextPage) {
      if (nextPage) {
        state.nextPage = true
      } else {
        state.nextPage = false
      }
    },
    setPersonHomeworld(state, array) {
      state.homeworld = array
    }
  },
  actions: {
    async getPeople({dispatch, commit}, currentPage= 1) {
      await axios({
        url: 'https://swapi.dev/api/people',
        methods: 'GET',
        params: {
          page: currentPage
        }
      })
      .then(resp => {
        commit('setPeopleArray', resp.data.results)
        commit('setPrevPage', resp.data.previous)
        commit('setNextPage', resp.data.next)
      })
      .catch(err => {
        console.log(err)
      })
    },
    async getPersonHomeworld({dispatch, commit}, url) {
      await axios({
        url: url,
        methods: 'GET'
      })
        .then(resp => {
          console.log(resp.data)
          commit('setPersonHomeworld', resp.data)
        })
    }
  },
  getters: {
    getPeopleArray(state) {
      return state.peopleArray
    },
    getPrevPage(state) {
      return state.prevPage
    },
    getNextPage(state) {
      return state.nextPage
    },
    getHomeworld(state) {
      return state.homeworld
    }
  }
}