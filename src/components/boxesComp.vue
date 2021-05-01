<template>
    <div class="main ma">
        <div class="container center">
            <div class="form-group">
                <label for="num" class="weight">Numèro box</label>
                <input type="text" v-model="send.number" id="num" class="form-control" placeholder="Numèro agent">
            </div>
            <button style='margin-bottom:10px;' @click="add" class='btn btn-primary'>Ajouter</button>
           <table class="table">
               <thead class="thead-dark">
                   <tr>
                       <th>Numèro</th>
                       <th>Action</th>
                   </tr>
               </thead>
               <tbody>
                   <tr v-for="(vh,index) in vhs" :key="index">
                       <td>{{vh.box_number}}</td>
                       <td>
                           <button data-toggle="modal" @click="format(vh)" data-target="#updatebx" class='btn btn-success'>Modifier</button>
                           <button @click="format(vh)" data-toggle="modal" data-target="#delbx" class="btn btn-danger">Supprimer</button>
                       </td>
                   </tr>
               </tbody>
           </table>
        </div>
        <updatebox-modal :vh="vh" />
        <deletebox-modal :vh="vh" />
    </div>
</template>

<script>
import axios from 'axios'
import updateboxModal from '../modals/updateboxModal'
import deleteboxModal from '../modals/deleteboxModal'
export default {
    data : ()=>{
        return{
            vhs : [],
            send : {
                number : null,
            },
            vh : []
        }
    },
    components : {
        updateboxModal,
        deleteboxModal
    },
    methods : {
        add()
        {
            var run = axios.post(this.link() + 'addboxe',this.send)
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
        var run = axios.get(this.link() + 'boxess')
        run.then(e=>{
            this.vhs = e.data
        })
        run.catch(e=>{
            console.log('err')
        })
    }
}
</script>