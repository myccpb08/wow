<template>
  <div class="notranslate">
    <div style="margin-top:48px"></div>
    <v-container>
      <form>
        <v-text-field v-model="portfolio.title" placeholder="제목을 입력해주세요."></v-text-field>

        <ImageInput :imgurl='portfolio.img'  v-on:changeImg="portfolio.img = $event"/>
        <v-textarea solo v-model="portfolio.body"></v-textarea>

        <v-flex  xs12 text-xs-center round my-5>
          <v-btn color="info" v-on:click="updatePortfolio()" class="movebtn button1">submit</v-btn>
          <v-btn color="info" @click='$router.go(-1)' class="movebtn button2">back</v-btn>
        </v-flex>

      </form>
    </v-container>
  </div>
</template>

<script>
import ImageInput from '../components/ImageInput'
import FirebaseService from '@/services/FirebaseService'
import $ from 'jquery'
export default {
  name: 'PortfolioWriter',
  data(){
    return{
      portfolioId:this.$route.params.portfolioId,
      portfolio:{},
    }
  },
  components: {
    ImageInput
  },
  mounted(){
    this.getPortfolio(this.portfolioId)
  },
  methods:{
    async getPortfolio(id) {
      this.portfolio = await FirebaseService.getPortfolio(id);
    },
    async updatePortfolio(){
      if(this.portfolio.title == ''){
        alert("제목을 입력해주세요")
      }else if(this.portfolio.body == ''){
        alert("내용을 입력해주세요")
      }else{
        await FirebaseService.updatePortfolio(this.portfolioId,this.portfolio.title,this.portfolio.body,this.portfolio.img,this.portfolio.uid);
        this.$router.go(-1)
      }

    }
  }
}
</script>
