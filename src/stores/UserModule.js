import UserService from '../../services/UserService.js'
import StorageService from '../../services/StorageService.js'

export default {
  state: {
    user: {
      _id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user._id
    },
    loggedInUser(state) {
      return state.user
    }
  },
  mutations: {
    setUser(state, { user }) {
      state.user = user
    },
    logoutUser(state) {
      state.user = {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    },
    addUser(state, {newUser}) {      
      state.user = newUser
    }
  },
  actions: {
    login(context, { userInfo }) {
      return UserService.login(userInfo)
        .then(user => {          
          if (!user) {
            return Promise.reject(err => err)
          } 
          context.commit({ type: 'setUser', user: user })
          StorageService.store('loggedInUser', user)
          return user
        })
        .catch(err => {
          return Promise.reject()
        })
      },
    signup(context, {newUser}) {
      return UserService.addUser(newUser)
      .then (newUser => {
        context.commit({type:'addUser', newUser})
      })
    },
    
  }
}