<template>
    <div class="default1">
        <div class="container">
            <div class="row">
                <div v-for="(detail,index) in cardDetail" :key="index" class="col-lg-4">
                     <card-comp :detail="detail" />
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
            cardDetail : null,
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
            if(localStorage.getItem('guard') != 0)
            {
              this.$router.push('/')  
            }
        }

    this.cardDetail =  [
            {name : 'Vèhicule',logo : 'car'},
            {name : 'Moto',logo : 'motorcycle'},
            {name : 'Les abonnés',logo : 'bell'}
        ]
    }
}
</script>