<template>
    <div class="modal fade" id="updatevh" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modifier vehicule</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <label for="uptype" class="weight">Type</label>
            <input type="text"  id="uptype" v-model="vh.type" class="form-control" lang="Type">
        </div>
        <div class="form-group">
            <label for="upprix" class="weight">Prix</label>
            <input type="text"  id="upprix" v-model="vh.price_vh" class="form-control" lang="Prix">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
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
            var run = axios.post(this.link() + 'updatevh',this.vh)
            run.then(e=>{
                if(e.data == "yes")
                {
                    this.statu('Opèration èffectuè','success')
                    setInterval(() => {
                        location.reload()
                    }, 2000);
                }
            })
            run.catch(e=>{
                console.log('err')
            })
        }
    }
}
</script>