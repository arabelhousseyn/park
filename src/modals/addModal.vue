<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ajouter un accessoire</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <label for="name" class='weight'>Dèsignation</label>
            <input type="text" @keypress="checker" v-model="data.name"  id="name" class='form-control' placeholder="Dèsignation">
        </div>
        <div class="form-group">
            <label for="price" class='weight'>Prix</label>
            <input type="text" @keypress="checker" v-model="data.price"  id="price" class='form-control' placeholder="Prix ex: 2000">
        </div>
        <div class="form-group">
            <label for="qt" class='weight'>Quantitè</label>
            <input type="number" @keypress="checker" v-model="data.qt" id="qt" class='form-control' placeholder="Quantitè">
        </div>
        <div v-if="data.qr != null" style='text-align:center;' class="form-group">
           <span><barcode id='sps' :value="data.qr"></barcode></span>
           <br>
           <div id="image"></div>
           <br>
            <button v-print="'#image'" class='btn btn-secondary'><ic icon="print" /></button>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" @click="add" :disabled="dis" class="btn btn-primary">Ajouter</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import VueBarcode from 'vue-barcode'
import print from 'vue-print-nb'
import axios from 'axios'
export default {
     data : ()=>{
         return{
             dis : true,
             data : {
                 name : null,
                 price : null,
                 qt : null,
                 qr : null,
             }
         }
     },
     directives: {
    print   
},
     components: {
       'barcode': VueBarcode
     },
     methods : {
         add()
         {
             this.dis = true
             var run = axios.post(this.link() + 'addProduct',this.data)
             run.then(e=>{
                 if(e.data == "yes")
                 {
                     this.hideModal()
                     this.$fire({
                 title: "Opèration èffectuè",
                type: "success",
               timer: 3000
             }).then(r => {
            console.log(r.value);
            });               
                 }
             })
             run.catch(e=>{
                 console.log('err')
             })
         },
         checker(){
           if(this.data.name != null)
           {
               this.data.qr = this.data.name
           }
           if(this.data.name != null && this.data.price != null && this.data.qt != null && this.data.qr != null)
           {
               this.dis = false
           }else{
               this.dis = true
           }
         },

     }
}
</script>