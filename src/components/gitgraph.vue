<template>
  <div style="margin-top: 50px;">
    <div id="testcontainer">

    <v-btn-toggle>
    <v-btn v-on:click="getCommits()" class="btn2">프로젝트</v-btn>
    <v-btn v-on:click="getRepos('myccpb08','5yRamVkqs4Z4bq-G1roY')" class="btn2">유림</v-btn>
    <v-btn v-on:click="getRepos('Kim_yh', 'N9RKhWdxvbGzn3oYEwVe')" class="btn2">영훈</v-btn>
    <v-btn v-on:click="getRepos('JIGyeongmin', 'yYcb5LEDsxxbN1PPxKEj')" class="btn2">경민</v-btn>
    <v-btn v-on:click="getRepos('LeeSuKyeong','dCp7MpuwFQNzYrLBZix5')" class="btn2">수경</v-btn>
    <v-btn v-on:click="getRepos('seok','xTftb51x12NTwFbxxAC5')" class="btn2">주연</v-btn>
  </v-btn-toggle>

    <div style="margin-top:50px;"></div>

    <div v-if='!valueA' class="calendarContainer">
      <div class="calendarBox notranslate" id="calendar_basic"></div>
    </div>

    <div v-if='valueA'>
      <v-timeline>
        <v-timeline-item v-for="(data,i) in tlInfo" :key='i' :color="data.color" small>
          <template v-slot:opposite>
            <span :class="`headline font-weight-bold ${data.color}--text`"><font>{{data.dayA}}</font></span>
          </template>
          <div v-if='i%2===0' class="py-3 text-lg-right">
            <h2 :class="`headline font-weight-light mb-3 ${data.color}--text`"><font>{{data.personA}}</font></h2>
            <div>
              {{data.activityA}}
            </div>
          </div>
          <div v-else class="py-3 text-lg-left">
            <h2 :class="`headline font-weight-light mb-3 ${data.color}--text`"><font>{{data.personA}}</font></h2>
            <div>
              {{data.activityA}}
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
      <div style="margin-top:80px"></div>
      <v-btn class="movebtn button1" href="https://lab.ssafy.com/Kim_yh/webmobile-sub2/network/master" target="_blank"><v-icon size="25" class="mr-2">fa-plus</v-icon> VIEW MORE</v-btn>
    </div>


  </div>
</div>
</template>

<script>
const BASE_URL = "https://lab.ssafy.com/api/v4";
google.charts.load("current", {
  packages: ["calendar"]
});
google.charts.setOnLoadCallback(drawChart);

// https://developers.google.com/chart/interactive/docs/gallery/calendar
function drawChart(datas) {
  var dataTable = new google.visualization.DataTable();
  var timeline = [];
  var cnt = [];
  var info = [];

  if (datas != undefined) {
    // datas 로 반복문 돌림
    let personal_title =  datas[0].author.name + " " + datas[0].author.username ;
    for (let index = 0; datas[index] != null; index++) {
      var data = datas[index].created_at;
      if (data == null) continue;

      var year = new Date(data).getFullYear();
      var month = new Date(data).getMonth() + 1;
      var day = new Date(data).getDate();
      var temp = year + "," + month + "," + day;

      var cccnt = 1;
      var len = timeline.length;
      for (var idx = 0; idx <= len; idx++) {
        if (idx == len) {
          timeline.push(temp);
          cnt.push(cccnt);
          break;
        } else if (timeline[idx] == temp) {
          cnt[idx]++;
          break;
        }
      }
    } // for문 끝

    var a = timeline.length;
    for (let idx = 0; idx < a; idx++) {
      var temp = [new Date(timeline[idx]), cnt[idx]];
      info.push(temp);
    }

    dataTable.addColumn({ type: "date", id: "Date" });
    dataTable.addColumn({ type: "number", id: "Won/Loss" });
    dataTable.addRows(info);

    var chart = new google.visualization.Calendar(
      document.getElementById("calendar_basic")
    );

    var options = {
      title: personal_title,
      height: 300,
      colorAxis: {
        maxValue: 30,
        minValue: 0,
        colors: ["#faed7d", "ff5e00"]
      },
      calendar: {
        underMonthSpace: 10,

        monthLabel: {
        fontName : 'BBTreeGR',
        fontSize: 12,
        color: '#8C8C8C',
      },
        monthOutlineColor: {
          stroke: "#D8AF91",
          strokeOpacity: 0.5,
          strokeWidth: 1
        },
        cellSize: 13,

        dayOfWeekLabel:{
          fontName : 'BBTreeGR',
          fontSize:8,
          color: 'black',
          bold: true,
          italic: true,
          color:  '#8C8C8C',
        },
        dayOfWeekRightSpace: 10,
      },
      noDataPattern : {
        backgroundColor : '#EAEAEA', // 줄무늬
        color : '#F6F6F6'
      },
    };

    chart.draw(dataTable, options);
  }
} // draw chart 끝

/////////////////////////////////////

export default {
  data() {
    return {
      valueA:true,
      tlInfo:[{dayA:'',personA:'',activityA:'',color:''}]
    };
  },
  methods: {
    getRepos(id, token) {
      this.valueA=false;
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
          var datass = []

          // total_try 만큼 요청보내기
          for (var trying = 0; trying < total_try; trying++) {
            fetch(
              `${BASE_URL}/users/${id}/events?namespaces&per_page=100&page=${trying+1}&private_token=${token}`
            )
              .then(res => {
                return res.json();
              })

              .then(data => {
                data.forEach(function(value){
                  datass.push(value)
                })
                drawChart(datass)
              });
          } // for문 끝 요청부분 완료
        }
      } // callback 함수 완료
      request(options, callback);
    }, // getRepose 끝

    // ★★★★★★★★★  프로젝트 commit 가져오는 함수
    getCommits() {
      console.log("여기는 커밋입니다")
      this.valueA=true;
      fetch(
        `${BASE_URL}/projects/6097/repository/commits??namespaces&per_page=100&private_token=5yRamVkqs4Z4bq-G1roY`
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          this.drawTimeline(data);
        });
    }, // getcommits 함수 완료
    drawTimeline(datas){
          var colorsA =['cyan','green','pink','amber','orange']
          if (datas != undefined) { // datas 로 반복문 돌림
            this.tlInfo=[];
            for (let index = 0; index <5; index++) {
              var data = datas[index].created_at;
              if(data == null) continue;

              var year = new Date(data).getFullYear()
              var month = new Date(data).getMonth() + 1
              var day = new Date(data).getDate()
              var temp = year + '.' + month + '.' + day

              // this.dayA.push(temp);
              // this.personA.push(datas[index].committer_name);
              // this.activityA.push(datas[index].message);
              this.tlInfo.push({dayA:temp,personA:datas[index].committer_name,activityA:datas[index].message,color:colorsA[index%5]});
          }  // for문 끝
        }
    }
  }, // methods 정의 완료
  mounted: function(){
    this.valueA=true;
    fetch(
      `${BASE_URL}/projects/6097/repository/commits??namespaces&per_page=100&private_token=5yRamVkqs4Z4bq-G1roY`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.drawTimeline(data);
      });
  }
};
</script>

<style>
.btn1{
  color: black !important;
  font-size: 25px;
}
.btn2{
  color: grey !important;
  font-size: 20px;
}

.calendarContainer {
  padding: auto;
  position: relative;
  height: 250px;
  overflow-x: auto;
  overflow-y: hidden;
}




::-webkit-scrollbar-thumb {
  height: 50px;
  width: 50px;
  background: rgba(255,255,255,0);
}
.calendarBox {
  margin-left:10vw;
}
#testcontainer{
  text-align: center;
}

</style>
