import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path : '/',
    name : 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  {
    path : '/parking',
    name : 'parking',
    component: () => import(/* webpackChunkName: "parking" */ '../views/parking.vue')
  },
  {
    path : '/vache',
    name : 'vache',
    component: () => import(/* webpackChunkName: "vache" */ '../views/vache.vue')
  },
  {
    path : '/tvehicule',
    name : 'tvehicule',
    component: () => import(/* webpackChunkName: "tvehicule" */ '../components/tvehiculeComp.vue')
  },
  {
    path : '/tmoto',
    name : 'tmoto',
    component: () => import(/* webpackChunkName: "tvehicule" */ '../components/tmotoComp.vue')
  },
  {
    path : '/product',
    name : 'product',
    component: () => import(/* webpackChunkName: "product" */ '../components/productComp.vue')
  },
  {
    path : '/tevh',
    name : 'tevh',
    component: () => import(/* webpackChunkName: "product" */ '../components/etvhComp.vue')
  },
  {
    path : '/tsvh',
    name : 'tsvh',
    component: () => import(/* webpackChunkName: "product" */ '../components/stvhComp.vue')
  },
  {
    path : '/tem',
    name : 'tem',
    component: () => import(/* webpackChunkName: "product" */ '../components/mteComp.vue')
  },
  {
    path : '/tsm',
    name : 'tsm',
    component: () => import(/* webpackChunkName: "product" */ '../components/steComp.vue')
  },
  {
    path : '/tlv',
    name : 'tlv',
    component: () => import(/* webpackChunkName: "product" */ '../components/tlvComp.vue')
  },
  {
    path : '/ttlv',
    name : 'ttlv',
    component: () => import(/* webpackChunkName: "product" */ '../components/ttlvComp.vue')
  },

  {
    path : '/apayments',
    name : 'apayments',
    component: () => import(/* webpackChunkName: "product" */ '../components/apaymentsComp.vue')
  },
  {
    path : '/subs',
    name : 'subs',
    component: () => import(/* webpackChunkName: "product" */ '../components/subsComp.vue')
  },
  {
    path : '/admin',
    name : 'admin',
    component: () => import(/* webpackChunkName: "product" */ '../components/adminComp.vue')
  },

]
//component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
