<template>
  <div class="notranslate">
    <div style="margin-top:48px"></div>


    <v-container>
      <form>
        <v-text-field v-model="title" placeholder="제목을 입력해주세요."></v-text-field>
        <markdown-editor v-model="body" ref="markdownEditor"></markdown-editor>

        <v-flex  xs12 text-xs-center round my-5>
          <v-btn color="info" v-on:click="postPost(title, body)" class="movebtn button2">submit</v-btn>
          <v-btn color="info" @click='$router.go(-1)' class="movebtn button3">back</v-btn>
        </v-flex>
      </form>
    </v-container>
  </div>
</template>

<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import FirebaseService from '@/services/FirebaseService'

export default {
  name: 'PostWriter',
  data(){
    return{
      title: '',
      body: ''
    }
  },
  components: {
    markdownEditor
  },
  mounted(){

  },
  methods:{
    async postPost(title, body){
      if(title == ''){
        alert("제목을 입력해주세요")
      }else if(body == ''){
        alert("내용을 입력해주세요")
      }else{
        await FirebaseService.postPost(title, body,this.$store.state.user)
        alert("post가 작성되었습니다.")
        this.$router.replace('/post')
      }
    }
  }
}
</script>
