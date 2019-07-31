<template>
  <div>
    <div style="margin-top:48px"></div>

    <v-container>

      <!-- Portfolio -->
      <v-layout>
        <v-flex xs12>
          <PortfolioList :limits="limits" :load-more="true" v-on:loadMore="limits = $event"></PortfolioList>
        </v-flex>
      </v-layout>

    </v-container>
  </div>
</template>

<script>
import PortfolioList from '../components/PortfolioList'

export default {
	name: 'PortfolioPage',
	components: {
		PortfolioList,
	},
  data(){
    return{
      limits : 6
    }
  }
}
</script>
