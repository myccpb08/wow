<template>
  <div>
    <div style="margin-top:48px"></div>

    <v-container>

      <v-layout column style='text-align:center'>
        <v-flex xs12>
        <strong class="display-1">{{portfolio.title}}</strong><br>
        date : {{formatedDate(portfolio.created_at)}}<br>
        by user {{portfolio.displayName}} | {{portfolio.email}}<br>
        content : <br>
        <v-img :src="portfolio.img">
        </v-img>
        {{portfolio.img}}
        {{portfolio.body}}

        </v-flex>
        <v-flex  xs12 text-xs-center round my-5>
          <router-link :to="{ name: 'portfolioUpdate', params: {portfolioId: portfolioId} }">
            <v-btn color="info" v-if="check" class="movebtn button1">update</v-btn>
          </router-link>
          <v-btn color="info" @click='deletePortfolio()' v-if="check" class="movebtn button1">delete</v-btn>
          <v-btn color="info" @click='$router.go(-1)' class="movebtn button2">back</v-btn>
        </v-flex>
      </v-layout>

      <!-- 댓글 테스트 -->
    <v-layout column style="text-align:left">
      <v-flex xs12>
        <p v-if="this.comments.length == 0">엄써용</p>
        <!-- 작성된 댓글 리스트가 없으면 -->
        <div v-if="this.comments.length > 0">
          <!-- 작성된 댓글 리스트가 있으면 -->
          <h3 v-for="comment in this.comments">
            {{ comment.email }} - {{ comment.contents }}

            <!-- 수정버튼 -->
            <v-btn class="ma-2" text icon @click='editComment(comment.index)'>
              <v-icon color="blue">edit</v-icon>
            </v-btn>

            <!-- 삭제버튼 -->
            <v-btn class="ma-2" text icon @click="deleteComment(comment.id)">
              <v-icon color="red">delete</v-icon>
            </v-btn>

            {{comments_edit[comment.index]}}

            <p v-show="comments_edit[comment.index]" id="test">
               랄랄라, </p>

          </h3>
        </div>
        <form>
          <v-text-field v-model="content" placeholder="내용을 입력해주세요."></v-text-field>
        </form>
        <v-btn
          color="info"
          v-on:click="postComment(portfolioId, content)"
          class="movebtn button2"
        >submit</v-btn>
      </v-flex>
    </v-layout>


    </v-container>
  </div>
</template>

<script>
import ImageInput from '../components/ImageInput'
import PortfolioList from '../components/PortfolioList'
import FirebaseService from '@/services/FirebaseService'

export default {
	name: 'portfolioDetail',
  props:{
    img:{type:String,default:''}
  },
  data(){
    return{
      portfolioId: this.$route.params.portfolioId,
      portfolio :{},
      comments: {},
      content: '',
      comments_edit: [],
      check:false
    }
  },
	components: {
		PortfolioList
	},
  mounted(){
    this.temp()
    // this.getPost(this.postId)
    // this.getComments(this.postId)
  },
  methods:{
    async temp(){
      this.checkUserClass(this.$store.state.user.uid)
      this.getPortfolio(this.portfolioId)
      this.getComments(this.portfolioId)
    },
        // 댓글 가져오기
    async getComments(id) {
      this.comments_edit = []
      this.comments = await FirebaseService.getComments(id);
      for (var i=0 ; i<this.comments.length; i++){
        this.comments_edit.push(0)
      }
    },

    // 댓글 생성
    async postComment(portfolioId, content) {
      if (content == "") {
        alert("내용을 입력해주세요");
      } else {
        await FirebaseService.postComment(
          portfolioId,
          content,
          this.$store.state.user
        );
        alert("댓글이 작성되었습니다.");
        this.content = ''
        this.getComments(portfolioId)
      }
    },
    // 댓글 수정
    async editComment(index){
      this.comments_edit[index]=true
    },
    // 댓글 삭제
    async deleteComment(comment_id) {
      await FirebaseService.deleteComment(this.portfolioId, comment_id);
      this.getComments(this.portfolioId)
    },
    async checkUserClass(uid){
      this.userClass = await FirebaseService.getUserClass(uid).then((result) => {
        return result;
      })
      if(this.userClass ==='master' || this.userClass==='admin'){
        this.check=true;
      }
    },
    async getPortfolio(id) {
      this.portfolio = await FirebaseService.getPortfolio(id);
    },
    async deletePortfolio(){
      await FirebaseService.deletePortfolio(this.portfolioId);
      this.$router.go(-1);
    },
    formatedDate(date) {
      if(date == null){
        return;
      }else{
			  return `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일`
      }
    }
  },
  watch : {
   comments_edit : function(){
   }
 }

}
</script>
