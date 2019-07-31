<template>
  <div class="notranslate">
    <div style="margin-top:48px"></div>
    <v-container>
      <form>
        <v-text-field v-model="post.title" placeholder="제목을 입력해주세요."></v-text-field>
        <markdown-editor v-model="post.body" ref="markdownEditor"></markdown-editor>

        <v-flex  xs12 text-xs-center round my-5>
          <v-btn color="info" v-on:click="updatePost()" class="movebtn button2">update</v-btn>
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
      postId: this.$route.params.postId,
      post :{}
    }
  },
  components: {
    markdownEditor
  },
  mounted(){
    this.getPost(this.postId)
  },
  methods:{
    async getPost(id) {
      this.post = await FirebaseService.getPost(id);
    },
    async updatePost(){
      if(this.post.title == ''){
        alert("제목을 입력해주세요")
      }else if(this.post.body == ''){
        alert("내용을 입력해주세요")
      }else{
        await FirebaseService.updatePost(this.postId,this.post.title,this.post.body,this.post.uid);
        this.$router.go(-1)
      }

    }
  }
}
</script>
