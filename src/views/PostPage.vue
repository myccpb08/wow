<template>
  <div>
    <div style="margin-top:48px"></div>

    <v-container>

      <!-- Post -->
      <v-layout>
        <v-flex xs12>
          <PostList :limits="limits" :load-more="true" v-on:loadMore="limits = $event"></PostList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PostList from '../components/PostList'
import FirebaseService from '@/services/FirebaseService'

export default {
	name: 'PostPage',
  data(){
    return{
      limits : 6
    }
  },
	components: {
		PostList,
	},
  mounted(){

  },
  methods:{

  }
}
</script>
