<template>
    <div class="default">
        <div class="container">
            <router-link style='margin-bottom:10px;' to='/parking' class='btn btn-warning' exact> <ic icon="arrow-left" /> </router-link>
            <div class="card">
                <div class="card-body center">
                    <div v-if="view" class="first">
                    <button data-toggle="modal" data-target="#addsub" class='btn btn-primary'><ic icon="plus" size="6x" /></button>
                    <h2 class='weight'>Mettez dans le scanner</h2>
                    </div>
                    <div v-if="view2" class="reload center">
                        <button class='btn btn-warning' @click="realod"><ic icon="recycle" /></button>
                    </div>
                    <div v-if="view2" class="second">
                        <div v-for="(info,index) in infos" :key="index" v-if="index > 0" id='ticket' style='display: flex;width: 450px;padding: 20px;flex-direction: column;align-items: center;'>
            <p class="center"><span class='weight'>AUTOBOX SIDI YAHIA</span>
                <br><span class='center'>PARKING, LAVAGE, ACCESSOIRES</span>
                <br><span class='center'>SOYEZ LES BIENVENUS</span> </p>
                <span><barcode id='sps' :value="info[0].ref_sub"></barcode></span>
                <span class='size'> <span>Nom complete : </span> {{info[0].fullName}}</span>
                <p class='size'> <span>Mobile : </span> {{info[0].phone}} </p>
                <p > <span class='weight'>Date abonnement / Dureè : </span> {{info[0].date_sub}} / {{info[0].number_delay}} mois</p>
                <p > <span class='weight'>Type d'abonnement / Prix : </span> <span v-if="info[0].type_sub == 0">Jour</span> <span v-if="info[0].type_sub == 1">Jour</span> / {{info[0].price_delay}}.00 DA </p>
                <p>GARDEZ VOTRE TICKET <br> LA AUTOBOX DECLINE TOUTE <br> RESPONSABILITE EN CAS DE <br> VOL OU DEGATS</p>
                <span>Ticket perdu 1000 DA</span>
                <div v-if="update" class="update">
            <p class="weight" style="color:red;">Votre abonnement est expirè veuillez renouveler</p>
            <button data-target="#updatesub" data-toggle="modal" @click="format(info[0])"  class="btn btn-success"><ic icon="pen" /></button>
        </div>
        </div>
                    </div>
                </div>
            </div>
        </div>
        <addsub-modal />
        <updatesub-modal :info="inf" />
    </div>
</template>

<script>
import axios from 'axios'
import VueBarcode from 'vue-barcode'
import addsubModal from '../modals/addsubModal'
import updatesubModal from '../modals/updatesubModal'
export default {
    data : ()=>{
        return{
            view : true,
            view2 : false,
            infos : [],
            update : false,
            inf : []
        }
    },
    components : {
        addsubModal,
        'barcode': VueBarcode,
        updatesubModal
    },
    methods : {
        onDecode(value)
        {
            var run = axios.post(this.link() + 'infosub',{sub : value})
            run.then(e=>{
                if(e.data == "no")
                {
                    this.statu('client n\'existe pas','error')
                }else{
                    this.view2 = true
                this.view = false
                this.infos = e.data
                var months = this.monthDiff(new Date(this.infos[1][0].date_sub),new Date(this.infos[0][0].actual))
                if(months >= this.infos[1][0].number_delay)
                {
                    this.update = true
                }else{
                    this.statu('Opèration èffectuè','success')
                }
                }
            })
            run.catch(e=>{
                console.log('err')
            })
        },
        format(value)
        {
            this.inf = value
        },
        realod()
        {
            location.reload()
        },
         monthDiff(d1, d2) {
       var months;  
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
      }
    },
    created()
    {
        this.$barcodeScanner.init(this.onDecode)
    }
    
}
</script>