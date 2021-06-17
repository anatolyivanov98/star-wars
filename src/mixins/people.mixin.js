export default {
  methods: {
    deleteFavoritePersonMixin(el, name) {
      el = el.filter(item=> item.name !== name)
      localStorage.setItem('favoritePeople', JSON.stringify(el))
      return el
    },
    filterPeopleMixin(filterName, filterGender, array) {

      if (filterName !== '' && filterGender === 'all') {
        return array.filter(
          person => person.name.toLowerCase().includes(filterName.toLowerCase())
        )
      }

      if (filterName === '' && filterGender !== 'all' && filterGender !== '') {
        return  array.filter(
          person => person.gender === filterGender
        )
      }

      if (filterName && filterGender !== 'all') {
        return array
          .filter(person => person.gender === filterGender)
          .filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

      }
      return array
    },
    personIdMixin(person) {
      const splitPersonUrl = person.url.split('/')
      return splitPersonUrl[splitPersonUrl.length - 2]
    },
    getFavoritePeopleFromLocalStorageMixin() {
      return JSON.parse(localStorage.getItem('favoritePeople')) || []
    }
  }
}