<template>
    <div class="main ma">
        <div class="container center">
            <div class="form-group">
                <label for="type" class="weight">Type</label>
                <input type="text" v-model="send.type" id="type" class="form-control" placeholder="Type">
            </div>
            <div class="form-group">
                <label for="price" class="weight">Prix</label>
                <input type="number" v-model="send.price" id="price" class="form-control" placeholder="Prix">
            </div>
            <button style='margin-bottom:10px;' @click="add" class='btn btn-primary'>Ajouter</button>
           <table class="table">
               <thead class="thead-dark">
                   <tr>
                       <th>Type</th>
                       <th>Prix</th>
                       <th>Action</th>
                   </tr>
               </thead>
               <tbody>
                   <tr v-for="(vh,index) in vhs" :key="index">
                       <td>{{vh.type}}</td>
                       <td>{{vh.price_vh}}.00 DA</td>
                       <td>
                           <button data-toggle="modal" @click="format(vh)" data-target="#updatevh" class='btn btn-success'>Modifier</button>
                           <button @click="format(vh)" data-toggle="modal" data-target="#delvh" class="btn btn-danger">Supprimer</button>
                       </td>
                   </tr>
               </tbody>
           </table>
        </div>
        <updatevehicule-comp :vh="vh" />
        <deletevehicule-modal :vh="vh" />
    </div>
</template>

<script>
import axios from 'axios'
import updatevehiculeComp from '../modals/updatevehiculeComp'
import deletevehiculeModal from '../modals/deletevehiculeModal'
export default {
    data : ()=>{
        return{
            vhs : [],
            send : {
                type : null,
                price : null
            },
            vh : []
        }
    },
    components : {
        updatevehiculeComp,
        deletevehiculeModal
    },
    methods : {
        add()
        {
            var run = axios.post(this.link() + 'addvh',this.send)
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
        var run = axios.get(this.link() + 'vhs')
        run.then(e=>{
            this.vhs = e.data
        })
        run.catch(e=>{
            console.log('err')
        })
    }
}
</script>