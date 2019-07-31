<template>
  <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
    <img :src="imageUrl" height="150" v-if="imageUrl"/>
    <img :src="imgurl" height="150" v-if="imgurl"/>
    <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
    <input type="file" style="display: none"   ref="image" accept="image/*" @change="onFilePicked">
  </v-flex>
</template>
<script>
import FirebaseService from '@/services/FirebaseService'
import $ from 'jquery'
export default {
  props: {
    imgurl: {type: String, default: ''}
  },
  data(){
    return{
      imageName: '',
      // imageUrl: this.imgurl,
      imageUrl: '',
      imageFile: '',
      selectedFile: null,
    }
  },
  methods:{
    pickFile () {
      this.$refs.image.click ()
    },
    onFilePicked (e) {
      const files = e.target.files
      console.log(files[0])
      if(files[0] !== undefined) {
        this.imageName = files[0].name
        if(this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader ()
        fr.readAsDataURL(files[0])
        console.log(fr)
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }

      this.selectedFile = e.target.files
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
            this.$store.state.inputimg = JSON.parse(response).data.link;
            console.log(this.$store.state.inputimg)
        });
      }

      this.$emit('changeImg',this.$store.state.inputimg)
    },


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
          this.$store.state.inputimg = JSON.parse(response).data.link;
        });
      }

    }
  }
}
</script>
