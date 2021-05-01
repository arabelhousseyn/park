<template>
    <div class="default">
      <div class="container">
          <router-link to='/vache' class='btn btn-warning' exact> <ic icon="arrow-left" /> </router-link>
          <div class="seperator"></div>
          <div style='text-align:center;' v-if="tog2" class="productDetail">
            <div class="card">
                <div class="card-body">
                    <p ><span class='weight'>Dèsignation</span> : <span>{{detail[0].name_product}}</span></p>
                    <p><span class='weight'>Prix</span> : <span>{{detail[0].price}}.00 DA</span></p>
                    <div class="form-group">
                        <label for="agent" class='weight'>Agent (optionnel)</label>
                        <select @change="gets($event)" id="agent" class='form-control'>
                            <option selected disabled>Choisir</option>
                            <option v-for="(ag,index) in agents" :key="index" :value="ag.id_agent">{{ag.number}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="bon" class='weight'>Numèro Bon (optionnel)</label>
                        <input type="number"  id="box" class='form-control' v-model="data.bon" >
                    </div>
                    <div class="form-group">
                        <label for="qtt" class='weight'>Quantitè</label>
                        <input type="number" v-model="qtt" id="qtt" class='form-control' placeholder="Quantitè">
                    </div>
                    <button @click="addd" class='btn btn-success'> <ic icon="check" /> </button>
                </div>
            </div>
        </div>
          <div class="row">
                  <div class="col-lg-12">
                      <div class="card center pad">
                          <div class="card-body">
                              <button data-toggle="modal" data-target="#exampleModal" title="Ajouter un accessoires" class='btn btn-primary'> <ic icon="plus" size="5x" /> </button>
                              <p><span class='weight'>Note : </span> Mettez dans le scanner pour scanner un produit</p>
                          </div>
                      </div>
                  </div>
          </div>
      </div>
      <add-modal />
    </div>
</template>
<script>
import addModal from '../modals/addModal'
import axios from 'axios'
export default {
    data : ()=>{
        return{
            data : {
                qr : null,
                bon : null
            },
            tog : false,
            detail : null,
            tog2  : false,
            qtt : 0,
            agent : null,
            agents : null,
        }
    },
    components : {
        addModal,
    },
    methods : {
    onDecode (decode) {
        this.data.qr = decode
        this.tog = true
        var run = axios.post(this.link() + 'qrproduct',this.data)
        run.then(e=>{
            this.detail = e.data
            this.tog2 = true
        })
        run.catch(e=>{
            console.log('err')
        })

        var run = axios.get(this.link() + 'agents')
        run.then(e=>{
         this.agents = e.data
        })
        run.catch(e=>{
            console.log('err')
        })


            if(this.data.qr != null)
            {
                this.tog = false
            }
        },
        gets(event)
         {
             this.agent = event.target.value
         },
        addd()
        {
            if(this.qtt == 0)
            {
                this.statu('Entrer une Quantitè supèrieur a 0','error')
            }else if(parseInt(this.qtt) > parseInt(this.detail[0].qt))
            {
              this.statu('Quantitè supèrieur a Quantitè du stock','error')  
            }else{
                let all = {
                    id : this.detail[0].id_product,
                    qt : this.detail[0].qt,
                    qtc : this.qtt,
                    agent : this.agent,
                    bon : this.data.bon
                }
                var run1 = axios.post(this.link() + 'order',all)
                run1.then(e=>{
                    this.qtt = 0
                   if(e.data == "yes")
                   {
                       // ticket to be loaded
                       this.tog2 = false
                       this.$fire({
                 title: "Opèration èffectuè",
                type: "success",
               timer: 3000
             }).then(r => {
            console.log(r.value);
            });
                   }
                })
                run1.catch(e=>{
                    console.log('err')
                })
            }
        }
    },
    created()
    {
        this.$barcodeScanner.init(this.onDecode)
    }
}
</script>