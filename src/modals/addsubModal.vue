<template>
    <div class="modal fade" id="addsub" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ajouter abonnè</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div v-if="vm" class="modal-body">
          <div class="form-group">
              <label for="name" class="weight">Nom complete</label>
              <input type="text" @keypress="checker" id="name" class="form-control" placeholder="Nom complete" v-model="send.name">
          </div>

          <div class="form-group">
              <label for="phone" class="weight">Mobile</label>
              <input type="number" @keypress="checker" id="phone" class="form-control" placeholder="Mobile" v-model="send.phone">
          </div>

          <div class="form-group">
              <label for="delay" class="weight">Durée</label>
              <select @change="checker" v-model="send.id" id="delay" class="form-control">
                  <option v-for="(delay,index) in delays" :key="index" :value="delay.id_delay">{{delay.number_delay}} mois / {{delay.price_delay}}.00 DA</option>
              </select>
          </div>
          <div class="form-group">
              <label for="type" class="weight">Type</label>
              <select @change="checker"  id="type" v-model="send.type" class="form-control">
                  <option selected disabled>Choisir</option>
                  <option value="0">Jour</option>
                  <option value="1">Nuit</option>
              </select>
          </div>
      </div>
      <div v-if="vm2" class="modal-body">
          <div v-for="(info,index) in infos" :key="index" id='ticket' style='display: flex;width: 450px;padding: 20px;flex-direction: column;align-items: center;'>
            <p class="center"><span class='weight'>AUTOBOX SIDI YAHIA</span>
                <br><span class='center'>PARKING, LAVAGE, ACCESSOIRES</span>
                <br><span class='center'>SOYEZ LES BIENVENUS</span> </p>
                <span><barcode id='sps' :value="info.ref_sub"></barcode></span>
                <span class='size'> <span>Nom complete : </span> {{info.fullName}}</span>
                <p class='size'> <span>Mobile : </span> {{info.phone}} </p>
                <p > <span class='weight'>Date abonnement / Dureè : </span> {{info.date_sub}} / {{info.number_delay}} mois</p>
                <p > <span class='weight'>Type d'abonnement / Prix : </span> <span v-if="info.type_sub == 0">Jour</span> <span v-if="info.type_sub == 1">Nuit</span> / {{info.price_delay}}.00 DA</p>
                <p>GARDEZ VOTRE TICKET <br> LA AUTOBOX DECLINE TOUTE <br> RESPONSABILITE EN CAS DE <br> VOL OU DEGATS</p>
                <span>Ticket perdu 1000 DA</span>

        </div>
        <button class='btn btn-primary form-control' v-print="'#ticket'" ><ic icon="print" /></button>
      </div>
      <div class="modal-footer">
        <button type="button" @click="done" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" @click="add" :disabled="dis" class="btn btn-primary">Ajouter</button>
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
            dis : true,
            vm : true,
            vm2 : false,
            infos : [],
            delays : [],
            send : {
                name : null,
                phone : null,
                id : null,
                type : null,
            }
        }
    },
    components : {
      'barcode': VueBarcode
    },
    directives : {
        print
    },
    methods : {
        add()
        {
            var run = axios.post(this.link() + 'addsub',this.send)
            run.then(e=>{
                if(e.data == "no")
                {
                    this.statu('Mobile dèja existe','error')
                }else{
                    this.vm = false
                    this.vm2 = true
                    this.infos = e.data
                }
            })
        },
        done()
        {
           this.vm = true
           this.vm2 = false
           this.infos = []
           this.send.name = null
           this.send.phone = null
           this.send.id = null
           this.send.type = null
        },
        checker()
        {
            this.dis = (this.send.name == null || this.send.phone == null || this.send.id == null || this.send.type == null) ? true:false
        },
    },
    created()
    {
        var run = axios.get(this.link() + 'delays')
        run.then(e=>{
            this.delays = e.data
        })
        run.catch(e=>{
            console.log('err')
        })
    }
}
</script>