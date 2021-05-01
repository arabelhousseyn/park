<template>
  <div id="app">
    <header-comp v-if="key" />
    <router-view />
  </div>
</template>

<script>
import headerComp from './components/headerComp'
export default {
  components: {
    headerComp
  },
  data :()=>{
   return{
     key : false,
   }
  },
  created()
  {
    if(localStorage.getItem('log') != undefined)
    {
      this.key = true
    }
  }
}
</script>
