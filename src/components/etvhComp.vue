<template>
    <div class="default">
        <div v-if="view" class="container">
            <router-link style='margin-bottom:10px;' to='/tvehicule' class='btn btn-warning' exact> <ic icon="arrow-left" /> </router-link>
            <div class="card">
                <div class="card-body">
                    <div v-for="(detail,index) in details" :key="index" id='ticket' style='display: flex;width: 450px;padding: 20px;flex-direction: column;align-items: center;'>
            <p class="center"><span class='weight'>AUTOBOX SIDI YAHIA</span>
                <br><span class='center'>PARKING, LAVAGE, ACCESSOIRES</span>
                <br><span class='center'>SOYEZ LES BIENVENUS</span> </p>
                <span><barcode id='sps' :value="detail.qr_box"></barcode></span>
                <span class='size'> <span>BON N : </span> {{detail.code}}</span>
                <p class='size'> <span>BOX N : </span> {{detail.box_number}} </p>
                <p > <span class='weight'>DATE ENTRÉE : </span> {{detail.date_enter}} </p>
                <p > <span class='weight'>HEURE : </span> {{detail.hour_enter}} </p>
                <p>GARDEZ VOTRE TICKET <br> LA AUTOBOX DECLINE TOUTE <br> RESPONSABILITE EN CAS DE <br> VOL OU DEGATS</p>
                <span>Ticket perdu 1000 DA</span>

        </div>
        <button class='btn btn-primary form-control' v-print="'#ticket'" ><ic icon="print" /></button>
                </div>
            </div>
        </div>
        <div v-if="!view" class="container">
            <router-link to='/tvehicule' style='margin-bottom:10px;' class='btn btn-warning' exact> <ic icon="arrow-left" /> </router-link>
            <div class="card">
               <div class="card-body center">
                   <button title="Ticket" @click="genTicket" class='btn btn-success'><ic icon="ticket-alt" /></button>
               </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueBarcode from 'vue-barcode'
import axios from 'axios'
import print from 'vue-print-nb'
export default {
    data : ()=>{
        return{
            view : false,
            details  : null,
            data : {
                hours : new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
            }
        }
    },
    components : {
      'barcode': VueBarcode
    },
    methods : {
        genTicket()
        {
            var run = axios.post(this.link() + 've',this.data)
            run.then(e=>{
                if(e.data.length > 0)
                {
                    if(e.data == "no")
                    {
                        this.statu('pas de box disponible','error')
                    }else{
                        this.details = e.data
                    this.view = true
                    }
                }
            })
            run.catch(e=>{
                console.log('err')
            })
        },
    },
    directives : {
        print
    },
    created()
    {
        
    }
}
</script>