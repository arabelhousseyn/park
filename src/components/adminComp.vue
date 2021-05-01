<template>
    <div class='main'>
        <nav-comp />
        <div class="container">
            <div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"><vehicule-comp /></div>
  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"><vage-comp /></div>
  <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab"><users-comp /></div>
  <div class="tab-pane fade" id="nav-agent" role="tabpanel" aria-labelledby="nav-agent-tab"><agent-comp /></div>
  <div class="tab-pane fade" id="nav-boxes" role="tabpanel" aria-labelledby="nav-boxes-tab"><boxes-comp /></div>
  <div class="tab-pane fade" id="nav-delay" role="tabpanel" aria-labelledby="nav-delay-tab"><delays-comp /></div>
  <div class="tab-pane fade" id="nav-price" role="tabpanel" aria-labelledby="nav-price-tab"><price-comp /></div>
</div>
        </div>
    </div>
</template>

<script>
import navComp from './navComp'
import vehiculeComp from './vehiculeComp'
import vageComp from './vageComp'
import agentComp from './agentComp'
import boxesComp from './boxesComp'
import delaysComp from './delaysComp'
import priceComp from './priceComp'
import usersComp from './usersComp'
export default {
    data : ()=>{
        return{

        }
    },
    components : {
        navComp,
        vehiculeComp,
        vageComp,
        agentComp,
        boxesComp,
        delaysComp,
        priceComp,
        usersComp
    },
}
</script>