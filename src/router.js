import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import PortfolioPage from './views/PortfolioPage.vue'
import PortfolioWriter from './views/PortfolioWriter.vue'
import PortfolioDetail from './views/PortfolioDetail.vue'
import PortfolioUpdate from './views/PortfolioUpdate.vue'
import PostPage from './views/PostPage.vue'
import PostWriter from './views/PostWriter.vue'
import PostDetail from './views/PostDetail.vue'
import PostUpdate from './views/PostUpdate.vue'
import BackOffice from './views/BackOffice.vue'

Vue.use(Router)


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
         path: '/',
         name: 'home',
         component: HomePage
      },
      {
         path: '/post',
         name: 'post',
         component: PostPage
      },
      {
         path: '/portfolio',
         name: 'portfolio',
         component: PortfolioPage
      },
      {
         path: '/portfoliowriter',
         name: 'portfoliowriter',
         component: PortfolioWriter
      },
      {
         path: '/postwriter',
         name: 'postwriter',
         component: PostWriter
      },
      {
         path: '/postDetail/:postId',
         name: 'postDetail',
         component: PostDetail,
         props:true
      },
      {
         path: '/postUpdate/:postId',
         name: 'postUpdate',
         component: PostUpdate,
         props:true
      },
      {
         path: '/backoffice',
         name: 'backoffice',
         component: BackOffice
      },
      {
         path: '/portfolioDetail/:portfolioId',
         name: 'portfolioDetail',
         component: PortfolioDetail,
         props:true
      },
      {
         path: '/portfolioUpdate/:portfolioId',
         name: 'portfolioUpdate',
         component: PortfolioUpdate,
         props:true
      }
  ]
})
