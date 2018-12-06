<template>
    <section class="reserve-parking">   
        <h2>{{parking.address}}</h2>
            <GmapMap
                :center="parking.location"
                :zoom="17"
                map-type-id="terrain"
                style="height: 300px"
            >
            <GmapMarker                 
                :position="parking.location"
                :clickable="true"
                :draggable="true"
                icon='http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                @click="center=m.position" />
            </GmapMap>
        
        <div class="reserve-details">
            <p>How many hours?</p>
            <form submit="setParkingDuration">
                <el-input-number v-model="hours" :min="1" :max="10"></el-input-number>               
                <p class="price">Total Price: ₪ {{cost}}</p>                
                <el-button type="success" @click="reserveParking(parking)">Reserve Parking!</el-button>
            </form>
        </div>
    </section>
</template>

<script>
import ParkingService from "../../services/ParkingService.js";
import {eventBus} from '../../services/EventBusService.js';
import StorageService from '../../services/StorageService.js'

export default {
  data() {
    return {
      hours: 1,
      parking: {
        location: {
          lat: 0,
          lng: 0
        }
      },
    };
  },
  created() {
    // this.initMarker()
    this.loadParking();
    this.loadHours()
  },
  // this.status = this.$store.state.UserModuls.isAdmin;
  methods: {
    reserveParking(parking) {
      
      if (!this.user._id) { 
        StorageService.store('parking-duration', this.hours)         
        this.$router.push("/login");
      } else {
        var occupiedUntil = Date.now() + this.hours * 60 * 60 * 1000;
        parking.reserverId = this.user._id;       
        parking.occupiedUntil = occupiedUntil;
        parking.iconUrl = "/img/occupied-48x48.png"
        this.$store
          .dispatch({ type: "reserveParking", parking: parking })
          .then(res => {
              this.showConfirmation()
            this.$router.push(`/navigate/${parking._id}`)
            localStorage.removeItem('parking-duration')
          });
      }
    },
    loadParking() {    
      var parkingId = this.$route.params.id;
      ParkingService.getById(parkingId).then(res => {
        this.parking = res.parking;
      });
    },
    showConfirmation() {        
        this.$message({
          message: 'Congratulations ' +this.user.firstName+', your parking at ' +this.parking.address+' is waiting for you!',
          type: 'success',
          duration: 2000
        });
    },
    loadHours () {
      let parkingDuration = StorageService.load('parking-duration')
      if (parkingDuration) this.hours = parkingDuration
    }
  },
  computed: {
    cost() {
      return this.hours * this.parking.price;
    },
    user() {
      return this.$store.getters.loggedInUser;
    }
  }
};
</script>

<style>
.hours {
  display: block;
  margin: 10px auto;
  padding: 7px;
}
.reserve-btn {
  padding: 7px;
}
.reserve-details {
  margin: 20px 0;
}
.el-input-number {
  margin: 20px 0;
}
.el-button {
  margin: 20px;
}
.reserve-parking {
    position: relative;
}

.price {
  margin-bottom: 20px;
}

.reserve-parking h2 {
    position: absolute;
    top: 0;
    width: 100vw;
    z-index:1;    
    color: white;
    background-color: rgba(66, 66, 66, 0.57)
    
}

</style>
