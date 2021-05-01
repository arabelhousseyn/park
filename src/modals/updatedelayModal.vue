<template>
    <div class="modal fade" id="updatedl" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modifier</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
                <label for="upnumm" class="weight">Mois</label>
                <input type="text" v-model="vh.number_delay" id="upnumm" class="form-control" placeholder="Mois">
            </div>

            <div class="form-group">
                <label for="uppr" class="weight">Prix</label>
                <input type="text" v-model="vh.price_delay" id="uppr" class="form-control" placeholder="Prix">
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">fermer</button>
        <button type="button" @click="update" class="btn btn-success">Modifier</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props : ['vh'],
    methods : {
        update()
        {
            var run = axios.post(this.link() + 'updatedelay',this.vh)
            run.then(e=>{
                if(e.data == "yes")
                {
                    this.statu('Opèration èffectuè','success')
                    location.reload()
                }
            })
            run.catch(e=>{
                console.log('err')
            })
        }
    }
}
</script>