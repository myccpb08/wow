<template>
  <div class="backDiv">
    <div style="margin-top:60px"></div>

    <!--Main Banner -->
    <v-img :src="getImgUrl('Jjobplanet_banner.png')" style="width:100%;"></v-img>

    <!-- apply  -->
    <div style="background:#3f4b5f;width:100%;height:300px;">

      <div class="hidden-xs-only" style="width:30%;height:100%;display:inline-block;padding-left:10%;padding-top:30px;float:left">
        <hr style="border:1px solid white; width:70px; margin-bottom:20px">
        <p>
          <font style="color:white;">
            Test님이 <br>
            <b>지원하신 채용공고</b> <br>
            입니다 <br><br>
          </font>
        </p>
        <v-btn flat dark outline style="width:100px;">채용공고 보기</v-btn><br>
        <v-btn flat dark outline style="width:100px;">자기소개서</v-btn>
      </div>

      <div class="hidden-sm-and-up" style="width:15%;height:100%;display:inline-block;float:left">
      </div>

      <div v-if="$store.state.userApplyData" style="width:70%;height:100%;display:inline-block;text-align:center;padding-top:80px;">
        <p>
          <font style="color:white;font-size:30px;">
            Test님이 지원하신 공고가 없습니다.<br>
            <router-link to="" style="color:white;font-size:30px"><b>전체 공고 보러가기</b></router-link>
            <hr style="border:1px solid white; width:150px; margin:0 auto">
          </font>
        </p>
      </div>

      <div v-else class="applyList" style="width:70%;height:100%;display:inline-block;text-align:center;padding-top:25px; overflow:auto;">
        <div v-for="i in 10" style="background:white; height:120px; width:150px; margin-left:5px; display:inline-block;"></div>

      </div>

    </div>

    <!-- Job Opening -->
    <div style="background:#f0f0f0; width:100%; text-align:center; padding:20px;">

      <div class="JO">
        <!-- hot -->
        <div class="JO" style="margin:8px">
          <p style="padding-right:170px;">최근 게시판 인기공고</p>
          <div style="background:#ffffff; width:260px; height:300px; display:inline-block">

          </div>
        </div>

        <!-- Within 7 -->
        <div class="JO" style="margin:8px">
          <p style="padding-right:140px;">7일 내에 마감하는 인기공고</p>
          <div style="background:#ffffff; width:260px; height:300px; display:inline-block">

          </div>
        </div>
      </div>

      <!--  -->
      <div class="JO hidden-xs-only" style="margin:8px">
        <p style="padding-right:330px;">직무별 인기공고</p>
        <div class="JO" style="background:#ffffff; width:400px; height:300px; display:inline-block">
        </div>
      </div>
    </div>

    <!-- content -->
    <div style="width:100%; min-height:800px;">
      <div style="width:80%; height:100%; margin:0 auto; padding:50px;">

        <div>
          <!-- text -->
          <div style="width:75%; height:100%; display:inline-block;">
            <p>
              <font style="font-size:24px;color:#ff6813">
                <b>작성도구:</b><br>
                자기소개서에 딱 필요한 기능<br>
              </font>
              <br>
              <font style="color:#555555">
                원하는 공고만 클릭하면 자기소개서 문항을 바로 볼 수 있고<br>
                맞춤법 검사의 글자 수도 확인 할 수 있어요.
              </font>
            </p>
          </div>
          <!-- img -->
          <div class="hidden-xs-only" style="width:25%; height:100%; display:inline-block">
            <v-img :src="getImgUrl('gmail_icon.png')" style="max-width:200px;"></v-img>
          </div>
        </div>

        <hr style="margin-top:50px;margin-bottom:50px;">

        <div>
          <!-- text -->
          <div style="width:75%; height:100%; display:inline-block;">
            <p>
              <font style="font-size:24px;color:#ff6813">
                <b>취업자료:</b><br>
                지원자 스펙 분석과 자소서연구소<br>
              </font>
              <br>
              <font style="color:#555555">
                지원기업의 경쟁률이 궁금하다면? 실시간 지원자 분석!<br>
                자기소개서 쓰기가 막막하다면? 자소서 연구소
              </font>
            </p>
          </div>
          <!-- img -->
          <div class="hidden-xs-only" style="width:25%; height:100%; display:inline-block">
            <v-img :src="getImgUrl('gmail_icon.png')" style="max-width:200px;"></v-img>
          </div>
        </div>

        <hr style="margin-top:50px;margin-bottom:50px;">

        <div>
          <!-- text -->
          <div style="width:75%; height:100%; display:inline-block;">
            <p>
              <font style="font-size:24px;color:#ff6813">
                <b>정보공유:</b><br>
                기업별, 직무별 채팅방<br>
              </font>
              <br>
              <font style="color:#555555">
                같은 기업에 지원하는 사람들의 실시간으로 만나보세요.<br>
                유용한 정보와 대화를 주고받을 수 있어요.
              </font>
            </p>
          </div>
          <!-- img -->
          <div class="hidden-xs-only" style="width:25%; height:100%; display:inline-block">
            <v-img :src="getImgUrl('gmail_icon.png')" style="max-width:200px;"></v-img>
          </div>
        </div>

      </div>
    </div>

    <div style="margin-top:100px;"></div>


    <!-- advertisement -->
    <div style="background:#f0f0f0; width:100%; min-height:130px; padding-top:30px;padding-left:10%">
      <div style="width:60%;height:100%;display:inline-block;float:left">
        <p>
          <font style="font-size:30px; color:#3f4b5f;">광고/채용공고 문의</font><br>
          <font>함께 할 인재를 찾고 계신가요? Jjobplanet에서 찾으세요!</font>
        </p>
      </div>

      <div class="hidden-xs-only" style="width:40%;height:100%;display:inline-block;">
        <v-btn dark color="warning">기업회원 페이지 가기</v-btn>
      </div>
    </div>

  </div>
</template>
<script>

import PortfolioList from '../components/PortfolioList'
import PostList from '../components/PostList'
import RepositoryList from '../components/RepositoryList'
import firebase from 'firebase/app'

export default {
  name: 'HomePage',
  components: {
    PortfolioList,
    PostList,
    RepositoryList,
  },
  data(){
    return{
      toggle_one : localStorage.getItem('langage')
    }
  },
  methods: {
    getImgUrl(img) {
      return require('../assets/team6/logo/' + img)
    },
  },
  mounted(){
    this.$store.state.langage = localStorage.getItem('langage');
  }
}
</script>

<style>
h2{
  color: black;
}
hr{
  border: solid 1px RGB(155, 155, 155, 0.2);
}
.backDiv{
  min-height: 1800px;
}

.JO{
  display: inline-block;
}

.applyList::-webkit-scrollbar {
  display:none;
}


</style>
