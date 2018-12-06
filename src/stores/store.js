import Vue from 'vue'
import Vuex from 'vuex'
import ParkingModule from './ParkingModule.js'
import UserModule from './UserModule.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   
  },
  getters: {
  },
  mutations: {
   
    
  },
  actions: {

  },
  modules:{
    ParkingModule,
    UserModule,
  }
})
