<template>
  <div class="notranslate">
    <v-img :src="this.$store.state.imgSrc" aspect-ratio="16/4" height="720">
      <v-layout align-center justify-center row fill-height>
        <v-flex text-xs-center>
          <span class="text-shadow display-2 font-weight-light">
            <slot name="text"/>
          </span>
        </v-flex>

        <div style="position:absolute; right:0px; bottom:0px">
          <form id="imgur">
            <div class="filebox">
              <v-btn icon @click="MyFile"><v-icon>star</v-icon></v-btn>
              <label for="upload"><v-icon>cloud_upload</v-icon></label>
              <input type="file" id="upload" @change="onFileSelected" class="imgur" accept="image/*" data-max-size="5000"/>
              <v-btn icon @click="RandomFile"><v-icon>autorenew</v-icon></v-btn>
            </div>
          </form>
        </div>

      </v-layout>
    </v-img>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js"></script>
<script>

import FirebaseService from '@/services/FirebaseService'
import firebase from 'firebase/app'
import $ from 'jquery'
export default {
  name: 'App',
   name: 'ImgBanner',
   data () {
     return{
       selectedFile: null,
       imgSrc:'',
       checkRandom: true,
       banner : []
     }
   },
   props: {
      text: {type: String},
      state: {type: String}
   },
   methods: {
     onFileSelected(event){
       this.checkRandom=false;
       this.selectedFile = event.target.files
       if(this.selectedFile.length){
         console.log("Uploading file to Imgur..");

         var apiUrl = 'https://api.imgur.com/3/image';
         var apiKey = '36757703a6732ed';

         var settings = {
           async: false,
           crossDomain: true,
           processData: false,
           contentType: false,
           type: 'POST',
           url: apiUrl,
           headers: {
             Authorization: 'Client-ID ' + apiKey,
             Accept: 'application/json'
           },
           mimeType: 'multipart/form-data'
         };

         var formData = new FormData();
         formData.append("image", this.selectedFile[0]);
         settings.data = formData;


         $.ajax(settings).done(response => {

           this.$store.state.imgSrc = JSON.parse(response).data.link;
           console.log(this.$store.state.imgSrc);
           this.imgSrc = this.$store.state.imgSrc;
           FirebaseService.postBanner(this.$store.state.imgSrc);
           this.$store.state.randomimg=false;
           localStorage.setItem('randomimg', this.$store.state.randomimg)
         });
       }

     },
     async MyFile(event){
       this.banner = await FirebaseService.getBanner();
       this.imgSrc= this.banner[0].img;
       this.$store.state.imgSrc = this.banner[0].img;
       this.$store.state.randomimg=false;
       console.log("myfile");
       console.log(this.banner[0].img);
       console.log(this.$store.state.randomimg);
       localStorage.setItem('randomimg', this.$store.state.randomimg)
       //FirebaseService.postBanner(this.imgSrc);
     },
     RandomFile(event){
       this.$store.state.randomimg=true;
       this.imgSrc =  "https://source.unsplash.com/random";
       this.$store.state.imgSrc=this.imgSrc;
       console.log("random");
       console.log(this.$store.state.imgSrc);
       console.log(this.$store.state.randomimg);
       //FirebaseService.postBanner(this.imgSrc);
       localStorage.setItem('randomimg', this.$store.state.randomimg)
     },
     async getBannerImg() {
       if(localStorage.getItem("randomimg")==="false"){
         this.banner = await FirebaseService.getBanner();
         this.imgSrc= this.banner[0].img;
         this.$store.state.imgSrc = this.banner[0].img;
         console.log("my start");
        console.log(this.imgSrc);
          console.log(localStorage.getItem("randomimg"));
      }else{
        this.imgSrc =  "https://source.unsplash.com/random";
        this.$store.state.imgSrc=this.imgSrc;
        console.log("random start");
        console.log(localStorage.getItem("randomimg"));
      }
     }
   },
   mounted(){
     this.getBannerImg();


   }
}

</script>

<style>
.filebox label {
  display: inline-block;
  padding: .5em;
  color: #ffffff;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 50px;
  -webkit-transition: background-color 0.2s;
  transition: background-color 0.2s;
}

.filebox label:hover {
  background-color: RGB(0,0,0,0.1)
}

.filebox label:active {
  background-color: RGB(0,0,0,0.5)
}

.filebox input[type="file"] {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

</style>
