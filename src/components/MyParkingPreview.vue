<template>
    <li>                         
        <router-link class="no-underline" :to="`/parking/${parking._id}`">
            <el-card class="box-card">
                <div class="my-parkings-container flex space-between">
                    <div class="image-container">                                  
                        <img  :src="parking.imageURL">
                        <div class="google-maps" :class="{'hidden-map': !mapView}">                                   
                            <GmapMap
                                :center="parking.location"
                                :zoom="15"
                                map-type-id="terrain"
                                style="width: 100%; height: 100%"
                            >
                            <GmapMarker                                               
                                :position="parking.location"
                                :clickable="true"
                                :draggable="false"
                                @click.prevent="center=m.position" />
                            </GmapMap> 
                        </div>
                        <div class="toggle-map-btn" @click.prevent="mapView = !mapView">
                         </div>            
                    </div>
                    <div class="details-container parking-properties flex column space-between">                                            
                        <ul class="parking-details">
                            <li><i class="fas fa-map-marker-alt"></i> {{parking.address}}</li>
                            <li><i class="fas fa-shekel-sign"></i> {{parking.price}} per hour</li>
                            <li v-if="owned">{{(parking.reserverId)? 'Occupied' : 'Available for rent'}}</li>
                            <li v-else><i class="far fa-clock"></i>  ends {{convertTimestamp(parking.occupiedUntil)}}</li>                                                    
                        </ul>                        
                        <el-button v-if="!owned" type="success" @click.prevent="stopParking(parking)">Stop Parking</el-button>  
                        <el-button v-if="owned" type="success" @click.prevent="$router.push('/parking/edit/'+parking._id)">Edit Parking</el-button>  
                    </div>
                                                         
                </div>
            </el-card> 
        </router-link>                          
    </li>
</template>

<script>
import moment from 'moment';

export default {
    name: 'my-parking-preview',
    props: ['parking', 'owned'],
  data () {
    return {
        mapView: false,
    }
  },

  methods: {
    convertTimestamp (timestamp) {
            return moment(timestamp).fromNow();;
    },
    stopParking() {
        this.$emit('stop-parking', this.parking)
    },
    editParking() {
        this.$emit('edit-parking', this.parking)
    }
  },

  created() {
   
  }

};
</script>

<style scoped>

.image-container {
    position: relative;
}
.image-container img {
    width: 408px;
    height: 200px;
    border-radius: 5px;
}

.google-maps {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.toggle-map-btn {
    position: absolute;
    bottom: 15px;
    right: 15px;    
    outline: none;   
    cursor: pointer;    
    width: 60px;
    height: 60px;
    background-image: url('../assets/images/google-maps-icon.png');   
}

.hidden-map {
    z-index: -1;
}
.parking-properties {
    text-align: left;    
}

.no-underline {
    text-decoration: none;
}

.details-container {
    flex-basis: 300px;
}

.parking-details li {
    padding-bottom: 10px;
}

@media (max-width: 880px) {
    .details-container {
        flex-basis: auto;
    }
}

@media (max-width: 770px) {
    .my-parkings-container {
        flex-direction: column;
        max-width: 408px;
        margin: 0 auto;
    }
}

@media (max-width: 560px) {
    .image-container img {
        width: 100%;
        height: auto;
    }
}

</style>
