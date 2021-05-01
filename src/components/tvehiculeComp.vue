<template>
    <div class="default">
        <div class="container">
            <router-link to='/parking' class='btn btn-warning' exact> <ic icon="arrow-left" /> </router-link>
            <div class="seperator"></div>
            <div class="row">
                <div v-for="(det,index) in details" :key="index" class="col-lg-6">
                   <card-comp :detail="det" />
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
            details : null,
        }
    },
    components : {
        cardComp
    },
    created()
    {
          this.details = [
              {name : 'Ticket entrer',logo : 'door-open'},
              {name : 'Ticket Sortie',logo : 'door-closed'}
          ]
    }
}
</script>