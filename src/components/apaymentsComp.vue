<template>
    <div class="default">
        <div class="container">
            <router-link to='/vache' style='margin-bottom:10px;' class='btn btn-warning' exact> <ic icon="arrow-left" /> </router-link>
            <div class="card">
                <div class="card-body center">
                    <h2 v-if="payments.length > 0" >{{payments[0].date}}</h2>
                    <p class='weight' v-for="(payment,index) in payments" :key="index"><span>Agent N : {{payment.number}}</span> / <span>Total : {{payment.total}}.00 DA</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data : ()=>{
        return{
            payments : []
        }
    },
    created()
    {
        var run = axios.get(this.link() + 'tpayment')
        run.then(e=>{
            this.payments = e.data
        })
        run.catch(e=>{
            console.log('err')
        })
    }
}
</script>