<template>
<div>
  <div style="margin-top:48px"></div>

  <v-container>

    <v-layout column style='text-align:center'>
      <v-flex xs12>
        <strong class="display-1">{{post.title}}</strong><br>
        date : {{formatedDate(post.created_at)}}<br>
        by user {{post.displayName}} | {{post.email}}<br>
        content : <br>
        {{post.body}}

      </v-flex>
      <v-flex xs12 text-xs-center round my-5>
        <router-link :to="{ name: 'postUpdate', params: {postId: postId} }">
          <v-btn color="info" v-if="check" class="movebtn button1">update</v-btn>
        </router-link>
        <v-btn color="info" @click='deletePost()' v-if="check" class="movebtn button1">delete</v-btn>
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
            <v-btn class="ma-2" v-if="comment.uid == $store.state.user.uid" text icon @click='comment.edit = !comment.edit'>
              <v-icon color="blue">edit</v-icon>
            </v-btn>

            <!-- 삭제버튼 -->
            <v-btn class="ma-2" v-if="comment.uid == $store.state.user.uid" text icon @click="deleteComment(comment.id)">
              <v-icon color="red">delete</v-icon>
            </v-btn>

            <!-- 댓글수정 작성 -->
            <form v-if="comment.edit">
              <v-text-field v-model="update_content" placeholder="수정 내용을 입력해주세요.">
              </v-text-field>
              <v-btn class="ml-0" text icon @click='editComment_contents(postId, update_content, comment.id)'>
                <v-icon>check_circle</v-icon>
              </v-btn>
            </form>

          </h3>
        </div>

        <div v-if="$store.state.user">
          <form>
            <v-text-field v-model="content" placeholder="내용을 입력해주세요"></v-text-field>
          </form>
          <v-btn color="info" v-on:click="postComment(postId, content)" class="movebtn button2">submit</v-btn>
        </div>
      </v-flex>
    </v-layout>


  </v-container>
</div>
</template>

<script>
import PostList from '../components/PostList'
import FirebaseService from '@/services/FirebaseService'

export default {
  name: 'postDetail',
  data() {
    return {
      postId: this.$route.params.postId,
      post: {},
      comments: {},
      content: '',
      update_content: '',
      check: false,
      // userinfo: this.$store.state.user.uid
    }
  },
  components: {
    PostList,
  },
  mounted() {
    this.temp()
  },
  methods: {
    async temp() {
      this.checkUserClass(this.$store.state.user.uid)
      this.getPost(this.postId)
      this.getComments(this.postId)
    },

    // 댓글 가져오기
    async getComments(id) {
      this.comments_edit = []
      this.comments = await FirebaseService.getComments(id);
      await FirebaseService.alarm()
      await FirebaseService.MessageSendTest()
      await FirebaseService.test()
    },

    // 댓글 생성
    async postComment(postId, content) {
      if (content == "") {
        alert("내용을 입력해주세요");
      } else {
        await FirebaseService.postComment(
          postId,
          content,
          this.$store.state.user
        );
        alert("댓글이 작성되었습니다.");
        this.content = ''
        this.getComments(postId)
      }
    },
    // 댓글 수정
    async editComment_contents(postId, update_content, commentId) {
      await FirebaseService.editComment(postId, update_content, commentId)
      this.update_content = ''
      this.getComments(postId)

    },

    // 댓글 삭제
    async deleteComment(comment_id) {
      await FirebaseService.deleteComment(this.postId, comment_id);
      this.getComments(this.postId)
    },

    async checkUserClass(uid) {
      this.userClass = await FirebaseService.getUserClass(uid).then((result) => {
        return result;
      })
      if (this.userClass === 'master' || this.userClass === 'admin') {
        this.check = true;
      }
    },
    async getPost(id) {
      this.post = await FirebaseService.getPost(id);
    },
    async deletePost() {
      await FirebaseService.deletePost(this.postId);
      this.$router.go(-1);
    },
    formatedDate(date) {
      if (date == null) {
        return;
      } else {
        return `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일`
      }
    }
  },
}
</script>
