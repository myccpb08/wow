<template>
  <v-layout column px-4>
    <v-flex v-for="i in repositories.length > limits ? limits : repositories.length">
      <v-divider v-if="i === 1"></v-divider>
      <Repository :repos="repositories[i - 1]"></Repository>
      <v-divider></v-divider>
    </v-flex>
  </v-layout>
</template>

<script>
import Repository from '@/components/Repository'
import GitlabService from '@/services/GitlabService'

export default {
   name: 'RepositoryList',
   props: {
      limits: {type: Number, default: 5},
      loadMore: {type: Boolean, default: false}
   },
   data() {
      return {
         repositories: [],
    }
   },
   components: {
      Repository
   },
   mounted() {
      this.getGitlabRepos('myccpb08','5yRamVkqs4Z4bq-G1roY')
      this.getGitlabRepos('Kim_yh', 'N9RKhWdxvbGzn3oYEwVe')
      this.getGitlabRepos('JIGyeongmin', 'yYcb5LEDsxxbN1PPxKEj')
      this.getGitlabRepos('LeeSuKyeong','dCp7MpuwFQNzYrLBZix5')
      this.getGitlabRepos('seok','xTftb51x12NTwFbxxAC5')
   },
   methods: {
      async getGitlabRepos(userName, token) {
         const response = await GitlabService.getRepos(userName, token)
         if(response.status !== 200) {
            return
         }

         //this.repositories = response.data
         this.repositories.push(response.data[0])
      },

   }
}
</script>
