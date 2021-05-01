<template>
    <div style="margin-top: 10%;" class="">
        <div class="container">
                <div v-if="adv == 0" class="col-lg-12">
                <card-comp :detail="detail" />
            </div>
            <div v-if="adv == 1">
                 <div class="row">
                     <div v-for="(det,index) in detail" :key="index"  class="col-lg-6">
                 <card-comp :detail="det" />
                  </div>
                 </div>
            </div>

            <div v-if="adv == 2">
                 <div class="row">
                     <div v-for="(det,index) in detail" :key="index"  class="col-lg-12">
                 <card-comp :detail="det" />
                  </div>
                 </div>
            </div>
        </div>
    </div>
</template>

<script>
import cardComp from './cardComp'
export default {
    data : ()=>{
        return{
            detail : null,
            adv : localStorage.getItem('adv')
        }
    },
    components : {
        cardComp
    },
    created()
    {
        if(localStorage.getItem('log') == undefined)
        {
            this.$router.push('/')
        }else{
            if(localStorage.getItem('guard') != 1)
            {
              this.$router.push('/')  
            }
        }

        if(this.adv == 0)
        {
         this.detail = {name : 'Ticket',logo : 'file-invoice'}   
        }else if(this.adv == 1){
            this.detail = [
                {name : 'Ticket lavage',logo : 'file-invoice'},
                {name : 'Accessoires',logo : 'box'},
            ]
        }else if(this.adv == 2)
        {
            this.detail = [
                {name : 'Payments',logo : 'money-bill'},
            ]
        }
    }
}
</script>