<template>
  <div class="py-3">
    <v-layout>
      <v-flex xs8>
        <!-- dialog 테스트 -->
        <v-dialog v-model="dialog" width="500px" height="300px;">
          <template v-slot:activator="{ on }">
                <v-btn color="#555555" flat v-on="on" v-on:click="test(repos.owner.username)" style="font-size:20px">{{repos.owner.name}}<v-icon>bar_chart</v-icon></v-btn>
                <a v-bind:href="repos.http_url_to_repo" target="_blank" style="position:absolute">
                  <font color="grey">{{repos.path_with_namespace}}</font>
                </a>
             </template>

          <v-card>
            <v-img :src="getImgUrl('gitgraph_work_background.png')">

              <v-card-text>

                  <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                          color="primary"
                          flat
                          @click="dialog = false"
                          >
                          <v-icon style="color:white">close</v-icon>
                        </v-btn>
                      </v-card-actions>
                <!-- 미니그래프 테스트 -->
                <div :id="repos.owner.username" style="height: 250px; width: 90%;" v-if="!flags" ></div>
                <!-- 미니그래프 테스트 끝 -->
                <v-divider></v-divider>
                <!-- <h4 class="mt-3">{{ repos.owner.name }}님 프로젝트 <v-icon> arrow_downward</v-icon> </h4> -->

                <h3 style="color:white" class="mt-3 notranslate">
                  <v-card-title primary-title>
                    <a v-bind:href="'https://lab.ssafy.com/'+repos.owner.username">{{repos.owner.name}}</a>&nbsp; 님의 연간 활동
                    <v-btn dark flat fab small v-on:click="test2(flags, repos.owner.username)">
                      <v-icon> arrow_downward</v-icon>
                    </v-btn>
                  </v-card-title>
                  <!-- {{ repos.owner.name }}님 프로젝트 More -->

                </h3>
                <div class="mt-0" v-if="flags">

                  <v-card dark flat class="mx-auto" max-width="1000">

                    <v-card dark flat>
                      <v-card-title class="pa-2 lighten-3">
                        <h3 class="title font-weight-light text-xs-left grow">전체 작업 프로젝트 : {{ totallength }} 개</h3>
                      </v-card-title>
                    </v-card>

                    <v-card-text class="py-0">
                      <v-timeline align-top dense>
                        <v-timeline-item color="pink"small>
                          <v-layout pt-3>
                            <v-flex xs3>
                              {{ when[0] }}
                            </v-flex>
                            <v-flex>
                              {{ three[0] }}
                            </v-flex>
                          </v-layout>
                        </v-timeline-item>

                        <v-timeline-item
                        color="teal lighten-3"
                        small
                        >
                        <v-layout wrap pt-3>
                          <v-flex xs3>
                            {{ when[0] }}
                          </v-flex>
                          <v-flex>
                            {{ three[1] }}

                          </v-flex>
                        </v-layout>
                      </v-timeline-item>

                      <v-timeline-item
                      color="pink"
                      small
                      >
                      <v-layout pt-3>
                        <v-flex xs3>
                          {{ when[0] }}
                        </v-flex>
                        <v-flex>
                          {{ three[2] }}
                        </v-flex>
                      </v-layout>
                    </v-timeline-item>

                    <v-timeline-item
                    color="teal lighten-3"
                    small
                    >
                    <v-layout pt-3>
                      <v-flex xs3>
                        {{ when[0] }}
                      </v-flex>
                      <v-flex>
                        {{ three[3] }}
                      </v-flex>
                    </v-layout>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-card>
          </div>
        </v-card-text>

    </v-img>
  </v-card>
</v-dialog>

<!-- dialog 테스트 끝 -->
</v-flex>
</v-layout>
</div>
</template>

<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
<script>

import GitlabService from "@/services/GitlabService";
const BASE_URL = "https://lab.ssafy.com/api/v4";
var tokens = {'myccpb08':'5yRamVkqs4Z4bq-G1roY', 'Kim_yh':'N9RKhWdxvbGzn3oYEwVe',
'JIGyeongmin':'yYcb5LEDsxxbN1PPxKEj', 'LeeSuKyeong':'dCp7MpuwFQNzYrLBZix5', 'seok':'xTftb51x12NTwFbxxAC5'}


function calendar(datas,id){
  var graph = {'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0}
  var act = []
  var dataPoints = []
  if (datas != undefined) {
    // datas 로 반복문 돌림
    for (let index = 0; datas[index] != null; index++) {
      var data = datas[index].created_at;
      if (data == null) continue;
      var month = new Date(data).getMonth() + 1;
      graph[month]++
    }
    for(var key in graph){
      act.push(graph[key])
      dataPoints.push({x:parseInt(key), y:graph[key]})
    }
    mini(dataPoints,id)


  }
}


function mini(data,id) {
  var chart = new CanvasJS.Chart(id, {
    backgroundColor : "rgba(0,0,0,0)",
    animationEnabled: true,
    axisY:{
      labelFontColor: "white",
      gridColor: "white",
    },
    axisX:{
      labelFontColor: "white",
      gridColor: "white",
    },
    data: [{
      yValueFormatString: "#,###",
      xValueFormatString: "#,###",
      type: "spline",
      lineColor: "#fff",
      dataPoints: data,
      lineThickness: 5,
      markerType:'circle',
      markerSize : 4,
      markerColor:'#881b3d'
    }]

  });
  chart.render();

}


export default {
  name: "Repository",
  props: {
    repos: { type: null }
  },
  data() {
    return {
      dialog : false,
      stats: {},
      flags : false,
      three : [],
      link : [],
      totallength:0,
      when : []
    };
  },
  mounted() {
  },
  methods: {
    getImgUrl(img) {
      return require('../assets/team6/logo/' + img)
    },
    getRepos(id, token) {
      var request = require("request");
      var headers = {
        "PRIVATE-TOKEN": token
      };
      var options = {
        url: "https://lab.ssafy.com/api/v4/users/" + id + "/events",
        headers: headers
      };

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          var howmany = response.headers["x-total"];
          var total_try = parseInt(howmany / 100) + 1;
          var datass = [];

          // total_try 만큼 요청보내기
          for (var trying = 0; trying < total_try; trying++) {

            fetch(
              `${BASE_URL}/users/${id}/events?namespaces&per_page=100&page=${trying +
                1}&private_token=${token}`
              )
              .then(res => {
                return res.json();
              })
              .then(data => {
                data.forEach(function(value) {
                  datass.push(value);
                });
                calendar(datass,id)
              })

            } // for문 끝 요청부분 완료

          }} // callback 함수 완료
          request(options, callback);
        }, // getRepose

        test(username) {
          this.getRepos(username, tokens[username]);
        },

        test2(flags,username) {
          this.flags = !flags
          this.getGitlabRepos(username, tokens[username])},

          async getGitlabRepos(userName, token) {
            const response = await GitlabService.getRepos(userName, token)
            if(response.status !== 200) {
              return
            }
            this.totallength = response.data.length
            var ssample = [response.data[1].path_with_namespace,response.data[2].path_with_namespace,response.data[3].path_with_namespace,response.data[4].path_with_namespace ]
            var wwhen = [response.data[1].created_at.substring(2,10),response.data[2].created_at.substring(2,10),response.data[3].created_at.substring(2,10),response.data[4].created_at.substring(2,10) ]
            this.three = ssample
            this.when = wwhen
          },
        } //method
      }; // default
      </script>
      <style>
      .v-btn__content{
        font-size: 20px;
      }
      .v-dialog{
        height: 500px;
        overflow: hidden;
      }
      .v-card{

      }
      .v-dialog::-webkit-scrollbar {

display:none;

}
      </style>
