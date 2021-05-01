<template>
    <div class="modal fade" id="updateag" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modifier agent</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
                <label for="upnum" class="weight">Numèro agent</label>
                <input type="text" v-model="vh.number" id="upnum" class="form-control" placeholder="Numèro agent">
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
            var run = axios.post(this.link() + 'updateagent',this.vh)
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