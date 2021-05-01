<template>
    <div class="container">
        <div class="login">
            <div class="card">
                <div class="card-body">
                    <p class='weight center'>Connecter vous</p>
                    <div class="form-group">
                      <label for="phone" class='weight'>Mobile</label>
                      <input type="number" @keypress="checker"  v-model="data.phone" id="phone" class="form-control" placeholder="Mobile">
                    </div>
                    <div class="form-group">
                        <label for="pin" class='weight'>Pin</label>
                        <input type="number" @keypress="checker" v-model="data.pin" id="pin" placeholder="Pin" class='form-control'>
                    </div>
                    <button @click="login" :disabled="dis" style='background-color:#2f71b8;' class='btn btn-primary form-control'><ic icon="sign-in-alt" /></button>
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
            data : {
                phone : null,
                pin : null,
            },
            dis : true
        }
    },
    methods : {
        checker()
        {
            if(this.data.phone != null && this.data.pin != null)
            {
                this.dis = false
            }else{
                this.dis = true
            }
        },
        login()
        {
            this.dis = true
            var run = axios.post( this.link() + 'login',this.data)
            run.then(e=>{
                if(e.data == "no")
                {
                    this.statu("Utilisateur inexistant",'error')
                }else{
                  let data = e.data.split(',')
                  if(data[2] == "")
                  {
                      data.pop()
                      localStorage.setItem('log',this.data.phone)
                      localStorage.setItem('guard',data[1])
                      location.href = '/parking'
                  }else{
                      if(data[2] == 3)
                      {
                          location.href = '/admin'
                      }else{
                      localStorage.setItem('log',this.data.phone)
                      localStorage.setItem('guard',data[1])
                      localStorage.setItem('adv',data[2])
                      location.href = '/vache'
                      }
                  }
                  
                }
            })
            run.catch(e=>{
                console.log('err')
            })
        }
    }
}
</script>