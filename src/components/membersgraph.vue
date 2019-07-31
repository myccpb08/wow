<template>
<div>
  <div id="chartContainer" style="height: 350px; width: 100%;"></div>
</div>
</template>

<script>

const BASE_URL = "https://lab.ssafy.com/api/v4";
var drawing = []
var check = 0
var person = {
  'Kim_yh': '영훈',
  'myccpb08': '유림',
  'JIGyeongmin': '경민',
  'seok': '주연',
  'LeeSuKyeong': '수경'
}



function getRepos(id, token) {
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
      check = drawing.length;
      if (check<5){
        drawing.push({
          label: person[id],
          y: parseInt(howmany)
      })
      }
        draw(drawing);
    }
  }
  request(options, callback);
}

function draw(drawing) {
  CanvasJS.addColorSet("greenShades",
                [
                "#BB96AB",
                "#a9647d",
                "#b08268",
                "#9fb488",
                "#59948e"
                ]);
  var chart = new CanvasJS.Chart("chartContainer", {
    colorSet : "greenShades",
    backgroundColor : "rgba(0,0,0,0)",
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "GitLab/Contribution"
    },
    axisY: {
      includeZero: true
    },
    data: [{
      type: "column",
      yValueFormatString: "#,###",
      dataPoints: drawing
    }]
  });
  chart.render();
}



export default {
  data() {
    return {
      calendar: []
    };
  }, // data 끝

  mounted() {
    getRepos('myccpb08', '5yRamVkqs4Z4bq-G1roY')
    getRepos('Kim_yh', 'N9RKhWdxvbGzn3oYEwVe')
    getRepos('JIGyeongmin', 'yYcb5LEDsxxbN1PPxKEj')
    getRepos('LeeSuKyeong', 'dCp7MpuwFQNzYrLBZix5')
    getRepos('seok', 'xTftb51x12NTwFbxxAC5')
  },

  methods: {
  } // methods 끝
}
</script>
