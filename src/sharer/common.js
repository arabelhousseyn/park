import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);

export default{
    data : ()=>{
        return{
             path : 'https://it-smv.com/park/park/api/',
             allow : 'https://cors-anywhere.herokuapp.com/'
        }
    },
    methods : {
        async statu(msg,type)
        {
           return await Vue.$toast.open({
            message: msg,
            type: type,
        });
        },
        link()
        {
           return this.path
        },
        hideModal()
        {
            document.getElementById('exampleModal').removeAttribute('class')
            document.getElementById('exampleModal').style.display = "none"
            document.querySelector('.modal-backdrop').removeAttribute('class')
        },
    }
}