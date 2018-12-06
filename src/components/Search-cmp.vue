<template>
    <section>
        <div class="flex">
                <input @keyup.enter="search" id="pac-input" class="input-location el-input__inner"
                 type="text" ref="input" placeholder="Enter a location">
        </div>
    </section>
</template>

<script>
import StorageService from '../../services/StorageService.js'

export default {
    data(){
        return {            
            loc:{}            
        }
    },    
    mounted: async function(){
        var google  = await this.$gmapApiPromiseLazy()
        var input  = this.$refs.input
        var autocomplete = new google.maps.places.Autocomplete(input);
    },
    methods:{
        search(){
            var geocoder = new google.maps.Geocoder();
            var input  = this.$refs.input.value
            geocoder.geocode( { 'address': input}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.loc.lat=results[0].geometry.location.lat();
        this.loc.lng=results[0].geometry.location.lng();

        this.$store.commit('setPosition', this.loc)

       this.$store.dispatch({type:'loadParkings'});


      } else {
        alert("Geocode was not successful for the following reason: " + status);
              }
         });
            
    },
    }
    
}
</script>

<style scoped>

.icon-search{
    border: none;
    margin-left: -50px;
}

@media (max-width: 770px) {
  .btn-map {
    display: block;
  }
}
</style>
