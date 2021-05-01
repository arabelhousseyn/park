<template>
    <div class="main ma">
        <div class="container center">
           <table class="table">
               <thead class="thead-dark">
                   <tr>
                       <th>Prix</th>
                       <th>Action</th>
                   </tr>
               </thead>
               <tbody>
                   <tr v-for="(vh,index) in vhs" :key="index">
                       <td>{{vh.data2}}.00 DA</td>
                       <td>
                           <button data-toggle="modal" @click="format(vh)" data-target="#fff" class='btn btn-success'>Modifier</button>
                       </td>
                   </tr>
               </tbody>
           </table>
        </div>
        <updateprice-modal :vh="vh" />
    </div>
</template>

<script>
import axios from 'axios'
import updatepriceModal from '../modals/updatepriceModal'
export default {
    data : ()=>{
        return{
            vhs : [],
            vh : []
        }
    },
    components : {
        updatepriceModal
    },
    methods : {
        format(value)
        {
            this.vh = value
        }
    },
    created()
    {
        var run = axios.get(this.link() + 'price')
        run.then(e=>{
            this.vhs = e.data
        })
        run.catch(e=>{
            console.log('err')
        })
    }
}
</script>