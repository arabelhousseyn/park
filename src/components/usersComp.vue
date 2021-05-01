<template>
    <div class="main ma">
        <div class="container center">
            <button style="margin-bottom:10px;" class="btn btn-primary" data-toggle="modal" data-target="#adduser" >Ajouter</button>
           <table class="table">
               <thead class="thead-dark">
                   <tr>
                       <th>Nom complete</th>
                       <th>Mobile</th>
                       <th>Pin</th>
                       <th>Statu</th>
                       <th>Action</th>
                   </tr>
               </thead>
               <tbody>
                   <tr v-for="(vh,index) in vhs" :key="index">
                       <td>{{vh.fullName}}</td>
                       <td>{{vh.phone}}</td>
                       <td>{{vh.pin}}</td>
                       <td><span v-if="vh.statu == 0 && vh.adv_statu == null">Parking</span> 
                       <span v-if="vh.statu == 1 && vh.adv_statu == 0">Caise 1</span>
                       <span v-if="vh.statu == 1 && vh.adv_statu == 1">Caise 2</span>
                       <span v-if="vh.statu == 1 && vh.adv_statu == 2">Responsable payment</span>
                       <span v-if="vh.statu == 1 && vh.adv_statu == 3">Admin principale</span> </td>
                       <td>
                           <button data-toggle="modal" @click="format(vh)" data-target="#fffsq" class='btn btn-success'>Modifier</button>
                           <button data-toggle="modal" @click="format(vh)" data-target="#fffsqq" class='btn btn-danger'>Supprimer</button>
                       </td>
                   </tr>
               </tbody>
           </table>
        </div>
        <adduser-modal />
        <updateuser-modal :vh="vh" />
        <deleteuser-modal :vh="vh" />
    </div>
</template>

<script>
import axios from 'axios'
import adduserModal from '../modals/adduserModal'
import updateuserModal from '../modals/updateuserModal'
import deleteuserModal from '../modals/deleteuserModal'
export default {
    data : ()=>{
        return{
            vhs : [],
            vh : []
        }
    },
    components : {
        adduserModal,
        updateuserModal,
        deleteuserModal
    },
    methods : {
        format(value)
        {
            this.vh = value
        }
    },
    created()
    {
        var run = axios.get(this.link() + 'userss')
        run.then(e=>{
            this.vhs = e.data
        })
        run.catch(e=>{
            console.log('err')
        })
    }
}
</script>