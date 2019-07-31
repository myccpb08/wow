<template>
  <v-app>
    <div id="contall">
    <MainHeader/>

    <v-content>
      <router-view/>
    </v-content>

    <back-to-top bottom="20px" right="10px">
      <v-btn flat icon type="button" class="btn btn-info btn-to-top notranslate"><v-icon>keyboard_arrow_up</v-icon></v-btn>
    </back-to-top>
    <MainFooter/>
  </div>
  </v-app>
</template>

<script>
import store from './store'
import MainHeader from './components/MainHeader'
import MainFooter from './components/MainFooter'
import Vue from 'vue'
import BackToTop from 'vue-backtotop'

import $ from 'jquery'
Vue.use(BackToTop)


export default {
  name: 'App',
  store,
  data() {
    return {
      night: false,
    }
  },
  components: {
    'MainHeader' : MainHeader,
    'MainFooter' : MainFooter,
    BackToTop,
  }
}

</script>

<style>
@font-face {
  font-family: 'Swagger';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/Swagger.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

*{
  font-family: Swagger;
}

#bannerTitle{
  z-index: 1;
  /* background: linear-gradient(90deg, rgba(240,20,30,5) 0%, rgba(150,120,220,1) 46%, rgba(250,240,0,5) 100%); */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

     letter-spacing: 0;
     padding: .25em 0 .325em;
     display: block;
     margin: 0 auto;

}

#contall{
  color: black;
}



@-webkit-keyframes Gradient {
   0% {
      background-position: 0% 50%
   }
   50% {
      background-position: 100% 50%
   }
   100% {
      background-position: 0% 50%
   }
}


::-webkit-scrollbar {width: 8px; height: 8px; border: 3px solid #fff; }
::-webkit-scrollbar-button:start:decrement, ::-webkit-scrollbar-button:end:increment {display: block; height: 10px; background: #efefef}
::-webkit-scrollbar-track {background: #efefef; -webkit-border-radius: 10px; border-radius:10px; -webkit-box-shadow: inset 0 0 4px rgba(0,0,0,.2)}
::-webkit-scrollbar-thumb {height: 50px; width: 50px; background: rgba(0,0,0,.2); -webkit-border-radius: 8px; border-radius: 8px; -webkit-box-shadow: inset 0 0 4px rgba(0,0,0,.1)}



</style>
