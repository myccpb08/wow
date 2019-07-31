import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: '',
    user: '',
    login: false,
    imgSrc: '',
    langage: 1,
    inputimg: '',
    randomimg:true,
    userApplyData: '',

  }
})
