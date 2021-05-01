<template>
    <div class="modal fade" id="adduser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ajouter</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <label for="namee" class="weight">Nom complete</label>
            <input type="text"  id="namee" v-model="send.name" class="form-control" placeholder="Nom complete">
        </div>

        <div class="form-group">
            <label for="mobilee" class="weight">Mobile</label>
            <input type="number"  id="mobilee" v-model="send.phone" class="form-control" placeholder="Mobile">
        </div>

        <div class="form-group">
            <label for="ppn" class="weight">Pin</label>
            <input type="number"  id="ppn" v-model="send.pin" class="form-control" placeholder="Pin">
        </div>

        <div class="form-group">
            <label for="stat" class="weight">Statu</label>
            <select v-model="send.statu" id="stat" class="form-control">
                <option selected disabled>Choisir</option>
            <option value="0">Parking</option>
            <option value="1,0">vage / caise 1</option>
            <option value="1,1">vage / caise 2</option>
            <option value="1,2">Responsable payment</option>
            <option value="1,3">Admin principale</option>
            </select>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" @click="add" class="btn btn-primary">Ajouter</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data : ()=>{
        return{
            send : {
                name : null,
                phone : null,
                pin : null,
                statu : null,
                adv_statu : null,
            }
        }
    },
    methods : {
        add()
        {
            var tmp = this.send.statu.split(',')
            if(tmp[1] != undefined)
            {
                this.send.statu = tmp[0]
                this.send.adv_statu = tmp[1]
            }

            axios.post(this.link() + 'adduserss',this.send)
            .then(e=>{
                if(e.data == "yes")
                {
                    this.statu('Opèration èffectuè','success')
                    location.reload()
                }
            })
            .catch(e=>{
                console.log('err')
            })
        }
    }
}
</script>