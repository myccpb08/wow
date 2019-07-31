<template>
  <div class="notranslate">
    <div style="margin-top:48px"></div>

    <div style="padding:50px">
      <div class="headline"><font>BackOfficePage</font></div>
      POST 게시글 수 : {{postNum}}<br>
      Portfolio 게시글 수 : {{portfolioNum}}<br>
      <v-layout column wrap justify-start mw-700>
        <v-flex v-for="i in userClasses.length">
          <UserClass
          :displayName="userClasses[i - 1].displayName"
          :email="userClasses[i - 1].email"
          :userClass="userClasses[i - 1].userClass"
          :uid="userClasses[i - 1].uid"
          >
          </UserClass>
        </v-flex>
      </v-layout>
    </div>

  </div>
</template>

<script>
import UserClass from '@/components/UserClass'
import FirebaseService from '@/services/FirebaseService'

export default {
   name: 'BackOfficePage',
  props:{

  },
  data(){
    return{
      userClasses: [],
      userClass :{},
      postNum:0,
      portfolioNum:0
    }
  },
   components: {
    UserClass
   },
  mounted(){
    this.temp()
  },
  methods:{
    async temp() {
      // await this.getUserClasses()
      var val = await this.checkUserClass(this.$store.state.user.uid);

      if(val){
        await this.getUserClasses()
        this.postNum = await this.getListNum('posts')
        this.portfolioNum = await this.getListNum('portfolios')
        // this.portfolioNum = await this.getListNum('portfolios')
      }else{
        alert("you are not admin. please login admin account");
        this.$router.replace('/')
      }
    },
    async getListNum(board){
      return FirebaseService.getListNum(board).then((num)=>{
        return num;
      })
    },
    async getUserClasses(){
      this.userClasses = await FirebaseService.getUserClasses()
    },
    async checkUserClass(uid){
      if(uid == null){
        return false;
      }
      this.userClass = await FirebaseService.getUserClass(uid).then((result) => {
        return result;
      })
      if('admin' ===this.userClass){
        return true;
      }else{
        return false;
      }
    }
  }
}
</script>
