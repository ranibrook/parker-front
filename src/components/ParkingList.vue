<template>
  <section class="parking-list" v-if="pos !== null">   
    <div class="container-search flex">
    </div>

    <button class="btn-map" @click="isMap = !isMap">{{toggle}}</button>    

    <div class="container-list flex">
      <div class="list list-h" :class="{showMap: isMap}">
         <FilterBy />
          <Search style="flex:1" />
           <ul>
              <li v-for="parking in parkings" :key="parking._id">
                  <parkingPreview :parking="parking"/>
              </li>
              <li>
                 <h5 v-if="parkings.length === 0">There are no parking spaces at the moment - please try later</h5>
              </li>
           </ul>
      </div>
      <GmapMap v-if="pos"
            :center="pos"
            :zoom="14"
            map-type-id="terrain"
            style="width: 60%; height: 100vh; flex:1"
      >
      <GmapMarker
              :key="index"
              v-for="(p, index) in parkings"
              :position="p.location"              
              :icon="p.iconUrl"
              :clickable="true"  
              :label="{ 
                text: `₪${p.price}`,
                color: 'white',
                fontSize: '16px'                
              }"

              :draggable="false"
              @click="$router.push('/parking/' + p._id)"
      />

            <GmapMarker 
              :position="pos"
              :icon="iconBase" />
      </GmapMap>  
    </div>
    <FooterCmp />
  </section>
</template>

<script>
import FooterCmp from '@/components/FooterCmp.vue' 
import ParkingPreview from './ParkingPreview.vue';
import LocService from '../../services/LocService.js'
import Search from './Search-cmp.vue' 
import FilterBy from './FilterByCmp.vue'

export default {
  data(){
    return {
      pos:null,      
      iconBase : 'img/my-position-64x64.png',
      isMap:false,
      msg:''
    }
  },
  
   props:{
     parkings:Array
   },
   methods:{
      //  getSymbol(parking){
      //    return  (parking.occupiedUntil < Date.now())?  '/img/occupied-48x48.png' : '/img/available-position-48x48.png' 
      //    },            
       getMyPos(){
        return LocService.getPosition()
       .then(pos => {
            let lat = pos.coords.latitude;
            let lng = pos.coords.longitude;
            return {lat , lng}
         })
       }    
  },

  created(){
        this.getMyPos()
         .then(res => {
          this.pos = res
         });
     },
     computed:{
       toggle(){
         if(this.isMap){
           return 'List'
         } else {
           return 'Map'
         }
       },
       
     },
  components:{
    ParkingPreview,
    Search,
    FilterBy,
    FooterCmp
    },
}
</script>

<style scoped>
ul {
  list-style: none;
}
.text-decoration {
  text-decoration: none;
}

h5 {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  width: 200px;
}
.list-h {
  height: 100vh;
  overflow-y: scroll;
  max-width: 420px;
}

.btn-map{
  display: none;
}




@media (max-width: 770px) {
  .list {
    width: 100%;  
    max-width: none;
  }

  .list.showMap {
    max-width: 0px;
  }


  .btn-map{
    display: block;
    border: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-bottom: 1px solid grey;
  }

  .list-h[data-v-49d44f76]{
    overflow-y: hidden;
    height: auto;
  }

}
</style>
