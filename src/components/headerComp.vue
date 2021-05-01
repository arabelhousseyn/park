<template>
    <header>
        <div class="header">
           <nav style='justify-content: flex-end; background: none !important;' class="navbar navbar-expand-lg">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
     <button @click="logout" :disabled="dis" class='btn btn-danger'><ic icon="power-off" /></button>
</nav>
        </div>
    </header>
</template>

<script>
export default {
   data : ()=>{
     return{
       dis : false
     }
   },
   methods : {
     logout()
     {
       this.dis = true
       localStorage.removeItem('log')
       localStorage.removeItem('guard')
       location.href = '/'
     }
   }
}
</script>