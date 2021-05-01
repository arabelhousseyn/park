<template>
    <div class="default">
        <div v-if="!view && !tog" class="container">
            <router-link style='margin-bottom:10px;' to='/vache' class='btn btn-warning' exact> <ic icon="arrow-left" /> </router-link>
            <div class="card">
              <div class="card-body center">
                 <h2 class='weight'>Mettez dans le scanner</h2>
              </div>
          </div>
        </div>
        <div v-if="view" class="container">
            <router-link style='margin-bottom:10px;' to='/vache' class='btn btn-warning' exact> <ic icon="arrow-left" /> </router-link>
          <div class="card">
              <div class="card-body center">
                  <div class="form-group">
                      <label for="agent" class='weight'>Agent</label>
                      <select v-model="send.agent" id="agent" class='form-control'>
                          <option v-for="(agn,index) in agents" :key="index" :value="agn.id_agent"> {{ agn.number }} </option>
                      </select>
                  </div>
                  <div class="form-group">
                      <label for="vhs" class='weight'>Vèhicules</label>
                      <select v-model="send.vh" id="vhs" class='form-control'>
                          <option v-for="(vh,index) in vhs" :key="index" :value="vh.id_vh"> {{ vh.type }} </option>
                      </select>
                  </div>
                  <div class="form-group">
                      <label for="vages" class='weight'>Les vages</label>
                      <select @change="selmult($event)" id="vages" class='form-control'>
                          <option selected disabled>Choisir</option>
                          <option v-for="(vg,index) in vages" :key="index" :value="vg.type"> {{ vg.type }} </option>
                      </select>
                      <div style='display: flex;flex-direction: row;justify-content: space-around; margin-top:9px;' class="selections">
                          <span style='background: #91ff91;padding: 7px;border-radius: 5px;' v-for="(ag,index) in send.selvhs" :key="index">{{ ag }}</span>
                      </div>
                  </div>
                  <button @click="valid" class='btn btn-success form-control'>Valider</button>
              </div>
          </div>
        </div>
        <div v-if="bon" class="container">
             <router-link style='margin-bottom:10px;' to='/vache' class='btn btn-warning' exact> <ic icon="arrow-left" /> </router-link>
            <div class="card">
                <div class="card-body">
                    <div v-for="(dis,index) in vbon" :key="index" id='ticket' style='display: flex;width: 450px;padding: 20px;flex-direction: column;align-items: center;'>
            <p class="center"><span class='weight'>AUTOBOX SIDI YAHIA</span>
                <br><span class='center'>PARKING, LAVAGE, ACCESSOIRES</span>
                <br><span class='center'>SOYEZ LES BIENVENUS</span> </p>
                 <span><barcode id='sps' :value="dis.qr_vage"></barcode></span>
                <span class='size'> <span>BON N : </span> {{dis.code}}</span>
                <p class='size'> <span>PRIX : </span> {{dis.price}}.00 DA</p>
                <p > <span class='weight'>DATE ENTRÉE: </span> {{dis.date_enter}} </p>
                <p > <span class='weight'>HEURE ENTRÉE / SORTIE : </span> {{dis.hour_enter}} / {{ dis.hour_out }} </p>
                <p>GARDEZ VOTRE TICKET <br> LA AUTOBOX DECLINE TOUTE <br> RESPONSABILITE EN CAS DE <br> VOL OU DEGATS</p>
                <span>Ticket perdu 1000 DA</span>

        </div>
        <button class='btn btn-primary form-control' v-print="'#ticket'" ><ic icon="print" /></button>
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
            vhs : null,
            vages : null,
            agents : null,
            send : {
                selvhs : [],
                vh : null,
                agent : null,
                details  : null,
                hours : new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
            },
            bon : false,
            vbon : null,
        }
    },

    components : {
        'barcode': VueBarcode
    },
    methods : {
        onDecode (decode) {
            this.tog = false
            this.data.qr = decode
            var run  = axios .post(this.link() + 'getbyqrcode',this.data)
            run.then(e=>{
                if(e.data.length > 0)
                {
                    if(e.data[0].hour_prog == null)
                    {
                    this.send.details = e.data[0].id_tvage
                    this.view  = true
                    }else{
                        if(e.data[0].hour_finish != null)
                        {
                            if(e.data[0].hour_out == null)
                            {
                                this.statu('Opèration èffectuè','success')
                            this.$router.push('/vache')
                            }else{
                                this.bon = true
                                this.vbon = e.data
                                this.tog = true
                            }
                        }
                    }
                }
            })
            run.catch(e=>{
                console.log('err')
            })

            var run1  = axios .get(this.link() + 'vhs')
            run1.then(e=>{
               this.vhs = e.data
            })
            run1.catch(e=>{
                console.log('err')
            })

            var run2  = axios .get(this.link() + 'vages')
            run2.then(e=>{
               this.vages = e.data
            })
            run2.catch(e=>{
                console.log('err')
            })

            var run3  = axios .get(this.link() + 'agentsavb')
            run3.then(e=>{
               this.agents = e.data
            })
            run3.catch(e=>{
                console.log('err')
            })

        },
        valid()
        {
           var rn = axios.post(this.link() + 'caise2',this.send)
           rn.then(e=>{
               if(e.data == "yes")
               {
                   this.statu('Opèration èffectuè','success')
                   this.$router.push('/vache')
               }
           })
           rn.catch(e=>{
               console.log('err')
           })
        },
        selmult(event)
        {
           this.send.selvhs.push(event.target.value)
        }
    },
    directives : {
        print
    },
    created()
    {
        this.$barcodeScanner.init(this.onDecode)
    }
}
</script>