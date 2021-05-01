<template>
    <div class="main ma">
        <div class="container center">
            <div class="form-group">
                <label for="month" class="weight">Mois</label>
                <input type="text" v-model="send.number" id="month" class="form-control" placeholder="Numèro mois">
            </div>

            <div class="form-group">
                <label for="pr" class="weight">Prix</label>
                <input type="number" v-model="send.price" id="pr" class="form-control" placeholder="Prix">
            </div>
            <button style='margin-bottom:10px;' @click="add" class='btn btn-primary'>Ajouter</button>
           <table class="table">
               <thead class="thead-dark">
                   <tr>
                       <th>Mois</th>
                       <th>Prix</th>
                       <th>Action</th>
                   </tr>
               </thead>
               <tbody>
                   <tr v-for="(vh,index) in vhs" :key="index">
                       <td>{{vh.number_delay}} mois</td>
                       <td>{{vh.price_delay}}.00 DA</td>
                       <td>
                           <button data-toggle="modal" @click="format(vh)" data-target="#updatedl" class='btn btn-success'>Modifier</button>
                           <button @click="format(vh)" data-toggle="modal" data-target="#deldl" class="btn btn-danger">Supprimer</button>
                       </td>
                   </tr>
               </tbody>
           </table>
        </div>
        <updatedelay-modal :vh="vh" />
        <deletedelay-modal :vh="vh" />
    </div>
</template>

<script>
import axios from 'axios'
import updatedelayModal from '../modals/updatedelayModal'
import deletedelayModal from '../modals/deletedelayModal'
export default {
    data : ()=>{
        return{
            vhs : [],
            send : {
                number : null,
                price : null,
            },
            vh : []
        }
    },
    components : {
        updatedelayModal,
        deletedelayModal
    },
    methods : {
        add()
        {
            var run = axios.post(this.link() + 'adddelay',this.send)
            run.then(e=>{
                if(e.data == "no")
                {
                    this.statu('Type dèja existe','error')
                }else{
                    this.statu('Opèration èffectuè','success')
                    location.reload()
                }
            })
        },
        format(value)
        {
            this.vh = value
        }
    },
    created()
    {
        var run = axios.get(this.link() + 'delays')
        run.then(e=>{
            this.vhs = e.data
        })
        run.catch(e=>{
            console.log('err')
        })
    }
}
</script>