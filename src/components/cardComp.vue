<template>
   <div @click="go(detail.name)" class="card pointer pad scale">
        <div class="card-body self">
            <h2> {{ detail.name }} </h2>
                <ic :icon="detail.logo" size="6x" />

        </div>
    </div>
</template>

<script>
export default {
    props : ['detail'],
    methods : {
        go(value)
        {
            if(this.$route.path == '/parking')
            {
                if(value == 'Vèhicule')
                {
                    this.$router.push('/tvehicule')
                }else if(value == 'Moto')
                {
                    this.$router.push('/tmoto')
                }
                if(value == "Les abonnés")
                {
                    this.$router.push('/subs')
                }
            }else if(this.$route.path == '/vache')
            {
                if(value == 'Accessoires')
                {
                    this.$router.push('/product')
                }
                if(value == 'Ticket')
                {
                    this.$router.push('/tlv')
                }
                if(value == 'Ticket lavage')
                {
                    this.$router.push('/ttlv')
                }

                if(value == "Payments")
                {
                    this.$router.push('/apayments')
                }
            }else if(this.$route.path == '/tvehicule')
            {
                if(value == 'Ticket entrer')
                {
                    this.$router.push('/tevh')
                }else if(value == 'Ticket Sortie')
                {
                    this.$router.push('/tsvh')
                }
            }else if(this.$route.path == '/tmoto')
            {
                if(value == 'Ticket entrer')
                {
                    this.$router.push('/tem')
                }else if(value == 'Ticket Sortie')
                {
                    this.$router.push('/tsm')
                }
            }
        }
    }
}
</script>