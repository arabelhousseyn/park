<template>
    <div class="main ma">
        <div class="container center">
            <div class="form-group">
                <label for="num" class="weight">Numèro agent</label>
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
                       <td>{{vh.number}}</td>
                       <td>
                           <button data-toggle="modal" @click="format(vh)" data-target="#updateag" class='btn btn-success'>Modifier</button>
                           <button @click="format(vh)" data-toggle="modal" data-target="#delag" class="btn btn-danger">Supprimer</button>
                       </td>
                   </tr>
               </tbody>
           </table>
        </div>
        <updateagent-modal :vh="vh" />
        <deleteagent-modal :vh="vh" />
    </div>
</template>

<script>
import axios from 'axios'
import updateagentModal from '../modals/updateagentModal'
import deleteagentModal from '../modals/deleteagentModal'
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
        updateagentModal,
        deleteagentModal
    },
    methods : {
        add()
        {
            var run = axios.post(this.link() + 'addagent',this.send)
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
        var run = axios.get(this.link() + 'agents')
        run.then(e=>{
            this.vhs = e.data
        })
        run.catch(e=>{
            console.log('err')
        })
    }
}
</script>