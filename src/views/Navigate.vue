<template>
    <section>           
        <GmapMap
            :center="parking.location"
            :zoom="11"
            map-type-id="terrain"
            style="height: 300px"
            ref="navigateMap"
        >
        </GmapMap>
        <div class="navigation flex space-between">              
            
            <img src="../assets/images/waze.png" @click="navigate" />                             
            <el-button type="success" @click="toggleDirections">{{(!directions.show)? 'Show' : 'Hide'}} Directions</el-button>            
        </div>
        <div class="panel" v-show="directions.show" ref="panel"></div>        
    </section>
</template>

<script>
import ParkingService from "../../services/ParkingService.js";
import LocPosition from "../../services/LocService.js";
import LocService from "../../services/LocService.js";
import { gmapApi } from "vue2-google-maps";

export default {
  data() {
    return {
      userLocation: {
        location: {
          lat: 0,
          lng: 0
        }
      },
      parking: {
        location: {
          lat: 0,
          lng: 0
        }
      },
      directions: {
          distance: "",
          time: "",
          show: false,
          url: ''
        },      
      icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    };
  },
  mounted: async function() {
    await Promise.all([this.loadParking(), this.getUserLocation()]);

    var google = await this.$gmapApiPromiseLazy()
      console.log(google);
      var directionsService = new this.google.maps.DirectionsService();
      var directionsDisplay = new this.google.maps.DirectionsRenderer();
      var userLocation = new google.maps.LatLng(
      this.userLocation.location.lat,
      this.userLocation.location.lng
    );

    var map = this.$refs.navigateMap.$mapObject;
    console.log('map ref: ', this.$refs.navigateMap)
    var panel = this.$refs.panel
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(panel);

    var request = {
      origin: this.userLocation.location,
      destination: this.parking.location,
      travelMode: "DRIVING"
    };
    directionsService.route(request, (result, status) => {
      if (status === "OK") {
        directionsDisplay.setDirections(result);
      }
    });
  },
  methods: {
    loadParking() {
      var parkingId = this.$route.params.id;
      //   console.log("this route URL: ", this.$route);
      return ParkingService.getById(parkingId).then(res => {
        console.log('resresresres',res);
        
        this.parking = res.parking;
      });
    },
    getUserLocation() {
      return LocService.getPosition()
        .then(pos => {
          var location = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          this.userLocation.location = location;
        })
        .catch(err => {
          console.log("Something went wrong: ", err);
        });
    },

    navigate() {
        let lat= +this.parking.location.lat
        let lng= +this.parking.location.lng
        window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`, '_blank');
      
    },

    toggleDirections() {
        this.directions.show = !this.directions.show
    }
 },

  computed: {
    google: gmapApi    
  }
};
</script>

<style scoped>
.navigation {
  margin: 20px auto;
  width: 200px;
}

.navigation img {
    height: 50px;
}

.navigation img:hover {
    cursor: pointer;
}

.navigation-header {
  margin: 20px;
}

.panel {
    width:40%;
    margin: 0 auto;
    border: 1px solid rgba(101, 99, 99, 0.25);
    padding: 10px;
}

@media (max-width: 890px) {
  .panel {
    width: 100%;
    margin: 0 auto;
  }
}

</style>
