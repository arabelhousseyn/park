<template>
    <div class="wrap">
        <login-comp />
    </div>
</template>

<script>
import loginComp from '../components/loginComp'
export default {
    components : {
          loginComp
    },
    data : () =>{
        return{

        }
    },
    created()
    {
       if(localStorage.getItem('log') != undefined)
       {
           if(localStorage.getItem('guard') == 0)
           {
               this.$router.push('/parking')
           }else if(localStorage.getItem('guard') == 1)
           {
              this.$router.push('/vache') 
           }
       }
    }
}
</script>