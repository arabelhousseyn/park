<template>
    <div class="default">
        <div v-if="!view" class="container">
            <router-link to='/tmoto' style='margin-bottom:10px;' class='btn btn-warning' exact> <ic icon="arrow-left" /> </router-link>
            <div class="card">
                <div class="card-body center">
                    <h2 class='weight'>Mettez dans le scanner</h2>
                </div>
            </div>
        </div>
        <div v-if="view" class="container">
            <router-link style='margin-bottom:10px;' to='/tmoto' class='btn btn-warning' exact> <ic icon="arrow-left" /> </router-link>
            <div class="card">
                <div class="card-body">
                    <div v-for="(dis,index) in disp" :key="index" id='ticket' style='display: flex;width: 450px;padding: 20px;flex-direction: column;align-items: center;'>
            <p class="center"><span class='weight'>AUTOBOX SIDI YAHIA</span>
                <br><span class='center'>PARKING, LAVAGE, ACCESSOIRES</span>
                <br><span class='center'>SOYEZ LES BIENVENUS</span> </p>
                 <span><barcode id='sps' :value="detail.qr_moto"></barcode></span>
                <span class='size'> <span>BON N : </span> {{dis.code}}</span>
                <p class='size'> <span>PRIX : </span> {{dis.price}}.00 DA</p>
                <p > <span class='weight'>DATE ENTRÉE / SORTIE : </span> {{dis.date_enter}} / {{ dis.date_out }} </p>
                <p > <span class='weight'>HEURE ENTRÉE / SORTIE : </span> {{dis.hour_enter}} / {{ dis.hour_out }} </p>
                <p>GARDEZ VOTRE TICKET <br> LA AUTOBOX DECLINE TOUTE <br> RESPONSABILITE EN CAS DE <br> VOL OU DEGATS</p>
                <span>Ticket perdu 1000 DA</span>

        </div>
        <button class='btn btn-primary form-control' @click="chs" v-print="'#ticket'" ><ic icon="print" /></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import VueBarcode from 'vue-barcode'
import print from 'vue-print-nb'
export default {
    data : ()=>{
        return{
            view : false,
            tog : false,
            data : {
                qr : null,
                hours : new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
            },
            disp : null
        }
    },
    components : {
    'barcode': VueBarcode
    },
    directives : {
        print
    },
    methods :{
        onDecode (decode) {
        this.data.qr = decode
        var run = axios.post(this.link() + 'ms',this.data)
        run.then(e=>{
            if(e.data.length > 0)
            {
               if(e.data == "no")
                {
                    this.statu('Ticket dèja générer','error')
                }else if(e.data == "nodata")
                {
                   this.statu('Ticket incorrect','error') 
                }else{
                    this.disp = e.data
                this.view = true
                }
            }
        })
        run.catch(e=>{
            console.log('err')
        })
        this.tog = false
        },
        toggle()
        {
            this.tog = true
        },
    },
     created()
    {
        this.$barcodeScanner.init(this.onDecode)
    }
}
</script>