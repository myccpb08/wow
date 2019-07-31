<template>
  <v-layout py-4 h-100>
    <v-flex row>
      <v-card max-width="300px" min-width="300px">
        <v-card-title primary-title>
          <div>
            <v-select v-on:change="updateUserClass" :items="items" label="class" :value="userClass"  style="width:100px; right:20px; position:absolute; display:inline-block"></v-select>
            <span class="--text">Name : {{displayName}}</span><br>
            <span class="--text">Email : {{email}}</span><br>
          </div>
        </v-card-title>
      </v-card>

    </v-flex>
  </v-layout>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import Vue       from 'vue'

export default {
   name: 'UserClass',
   props: {
    changed_at: {type: String},
    displayName: {type: String},
    email: {type: String},
      userClass: {type: String},
    uid: {type: String}
   },
  data() {
    return {
      items: ['admin', 'master', 'visitor']
    }
  },
  methods: {
    updateUserClass(selectObject){
      FirebaseService.updateUserClass(this.uid, selectObject);

    }
  },
  computed: {

  }

}
</script>
