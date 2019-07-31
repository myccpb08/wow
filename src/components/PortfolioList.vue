<template>
  <div class="notranslate">
    <v-layout mt-5 wrap>
      <v-flex v-for="i in portfolios.length > limits ? limits : portfolios.length"  xs12 sm6 md4 lg3>
        <router-link :to="{ name: 'portfolioDetail', params: {portfolioId: portfolios[i-1].id} }">
        <Portfolio class="ma-3"
        :date="portfolios[i - 1].created_at.toString()"
        :title="portfolios[i - 1].title"
        :body="portfolios[i - 1].body"
        :imgSrc="portfolios[i - 1].img"
        ></Portfolio>
        </router-link>
      </v-flex>

      <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn v-if="limits<portfolios.length" v-on:click="loadMorePortfolios" class="movebtn button1"><v-icon size="25" class="mr-2">fa-plus</v-icon>View more</v-btn>
        <router-link to="/portfoliowriter"><v-btn v-if="$store.state.user" class="movebtn button2">
          <v-icon size="25" class="mr-2">create</v-icon>Write</v-btn></router-link>
        </v-flex>
      </v-layout>
    </div>
  </template>
  <script>
  import Portfolio from '@/components/Portfolio'
  import FirebaseService from '@/services/FirebaseService'

  export default {
    name: 'PortfoliosList',
    props: {
      limits: {type: Number, default: 4},
      loadMore: {type: Boolean, default: false}
    },
    data() {
      return {
        portfolios: [],
        proplimit:this.limits
      }
    },
    components: {
      Portfolio
    },
    mounted() {
      this.getPortfolios()
    },
    methods: {
      async getPortfolios() {
        this.portfolios = await FirebaseService.getPortfolios()
      },
      loadMorePortfolios() {
        this.proplimit +=6;
        console.log("proplimit : " + this.proplimit)
        this.$emit('loadMore',this.proplimit)
      }
    },
  }
  </script>
  <style>
  .mw-700 {
    max-width: 700px;
    margin: auto;
  }
  </style>
