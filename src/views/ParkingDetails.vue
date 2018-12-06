<template>
    <section v-if="parkingDetail">

<div class="section-details flex">

    <el-card class="box-card">
         <el-button @click.native="$router.push('/parking')" style="display:flex;" type="info" plain>Back</el-button>
        <h3 class="address">{{parkingDetail.parking.address}}</h3>
        <img :src="parkingDetail.parking.imageURL" class="parking-details-image image">
        <div>
            <div class="parking-details column">
                <h5 class="to-know">things you should know:</h5>
                <p><i class="fas fa-shekel-sign"></i> {{parkingDetail.parking.price}}</p>
                <p><i class="fas fa-map-marker-alt"></i>  {{calcDistance}} </p>
                <div class="line"></div>
                <p class="description">{{parkingDetail.parking.description}}</p>
                <div class="line"></div>
                <div class="amenities flex">
                    <p v-if="parkingDetail.parking.amenities.isPaved"><i class="fas fa-road"></i></p>
                    <p v-if="parkingDetail.parking.amenities.isForDisable"><i class="fas fa-wheelchair"></i></p>
                    <p v-if="parkingDetail.parking.amenities.isCovered"><i class="fas fa-parking"></i></p>
                </div>       
            </div>
            <div class="line"></div>
            <div class="about-owner flex column space-between">
                <h5>Owner details</h5>
                <p>{{parkingDetail.owner.firstName}} {{parkingDetail.owner.lastName}}</p>
                <p>{{parkingDetail.owner.email}}</p>
            <div>
                <el-button @click="$router.push('/reserve/'+parkingDetail.parking._id)" 
                 class="btn-reserve" type="success" :disabled="isOccupied">Reserve Now!</el-button>
            </div>
            </div>
        </div>

    </el-card>
<GmapMap
  :center="parkingDetail.parking.location"
  :zoom="16"
  map-type-id="terrain"
  style="flex:1;"
>
  <GmapMarker
    :position="parkingDetail.parking.location"
    :clickable="true"
    :draggable="false"
    :icon="parkingDetail.parking.iconUrl"
    @click="$router.push('/reserve/'+parkingDetail.parking._id)"
  />
</GmapMap>

</div>

    </section>
</template>

<script>

import ParkingService from '../../services/ParkingService.js'
import LocService from '../../services/LocService.js';

export default {
data(){
    return {
        parkingDetail:null,
        lat:0,
        lng:0,
        markers:[],
        distance: 0,
    }
},
methods:{
    loadParkingId(){
        
        var parkingId = this.$route.params.id
        return ParkingService.getById(parkingId)
        .then(res => {
            this.parkingDetail = res
             console.log('parking icon: ', this.parkingDetail.parking.iconUrl)
        })
    },

    getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
          var R = 6371; // Radius of the earth in km
          var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
          var dLon = this.deg2rad(lon2-lon1); 
          var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c; // Distance in km
          return d;
    },
    deg2rad(deg) {
      return deg * (Math.PI/180)
    },


},

    created : async function (){       
        var parkignPrm = this.loadParkingId()
        var locationPrm = LocService.getPosition()
        .then(pos => {
            let lat = pos.coords.latitude
            let lng = pos.coords.longitude
            return {lat , lng}
        })
        var [_ , loc] = await Promise.all([
            parkignPrm,locationPrm
        ])
        this.distance = this.getDistanceFromLatLonInKm(
            this.parkingDetail.parking.location.lat,
            this.parkingDetail.parking.location.lng,
            loc.lat,
            loc.lng
        )

    },
    computed:{
        isOccupied(){
            return this.parkingDetail.parking.occupiedUntil > Date.now()
        },
        calcDistance() {
            if (this.distance > 1) {
                return this.distance.toFixed(2) + " km from you"
            }
            else {
                return this.distance.toFixed(3)*1000 + " meters from you"
            }
        }

    }
}
</script>

<style scoped lang="scss">

.description{
    line-height: 25px;
}

.parking-details-image {
    max-width: 100%;
}
 .section-details .box-card{
     max-width: 450px;
     padding: 0;
}


.address{
    margin-bottom: 10px;
}

/* img-parking */
.img-parking-car {
  width: 50%;
  height: 300px;
  object-fit: cover;
}

/* amenties */
.box-amenties > *:not(:last-child) {
  margin-right: 20px;
}
.box-amenties {
  margin-top: 15px;
}

/*buttons */
.btn-reserve {
width: 100%;
margin-top: 10px;
}

/*details */
.parking-details {
  text-align: left;
  .to-know{
      padding: 10px 0;
  }
}

.parking-details > *:not(:last-child){
    margin-bottom: 5px;    
}

.about-owner{
    padding-top: 15px;
    text-align: start;
}

.about-owner > *:not(:last-child){
    margin-bottom: 5px;
}

.amenities p{
    margin-right: 5px;
}

.parking-details i{
        margin-right: 10px;
    }


@media(max-width: 770px){
    .section-details .box-card{
        max-width: none;
        width: 100%;
    }

    .box-card img {
        background-size: cover;
        width: 100%;
        height: 180px;
    }   
}

</style>
