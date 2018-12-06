<template>   

    <section v-if="user">

         <el-tabs type="border-card">
            <el-tab-pane label="Reserved Parkings">
              <h2 v-show="!reserved">You haven't reserved any parking yet.</h2>
                 <div v-show="reserved" class="reserved-parkings">           
                    <h2 v-if="reservedParkings.length > 0">My Reserved Parkings:</h2>
                    <ul>
                        <my-parking-preview v-for="parking in reservedParkings" :key="parking._id"
                            :parking="parking" :owned="false"
                            @stop-parking="stopParking(parking)">
                        </my-parking-preview>                        
                    </ul>
                </div>
            </el-tab-pane>

            <el-tab-pane label="Owned Parkings">
                 <div class="owned-parkings">
                    <h2>My Owned Parkings</h2>
                    <ul>
                        <my-parking-preview v-for="parking in ownedParkings" :key="parking._id"
                            :parking="parking" :owned="true"
                           @edit-parking="editParking">
                        </my-parking-preview>                        
                    </ul>
                </div>
            </el-tab-pane> 

            <el-tab-pane label="Profile">
               <div class="my-details">
                     <h2>My Details</h2>
                     <el-card class="box-card">  
                        <div class="profile-details flex space-around" >
                            <img :src="user.profileImage" class="profile-image" />
                            <div class="profile-details flex column">
                                <h2>{{user.firstName}} {{user.lastName}}</h2>
                                <p>{{user.email}}</p>
                            </div>  
                        </div>                     
                                               
                     </el-card>
               </div>
            </el-tab-pane>  

        </el-tabs>


    </section>

</template>

<script>
import ParkingService from "../../services/ParkingService";
import UserService from "../../services/UserService.js";
import myParkingPreview from "@/components/MyParkingPreview";
import moment from "moment";

export default {
  data() {
    return {
      user: null,
      reservedParkings: null,
      ownedParkings: null
    };
  },
  methods: {
    loadParkingsActivity() {
      console.log("route params userId: ", this.$route.params.userId);
      var userId = this.$route.params.userId;
      console.log("userID: ", userId);
      UserService.getUserById(userId).then(res => {
        this.user = res.user;
        this.reservedParkings = res.reservedParkings;
        this.ownedParkings = res.ownedParkings;
        console.log('my owned parkings: ', this.ownedParkings)
      });
    },
    convertTimestamp(timestamp) {
      return moment(timestamp).fromNow();
    },
    stopParking(parking) {
      console.log('parking to stop: ', parking)
        // could not figure out why 'this' was undefined in the 'then' cb'
    
      return this.$store
        .dispatch({ type: "stopParking", parking: parking })
        .then(() => {
          // var parkingIdx = self.reservedParkings.findIndex(parking => parking._id === parking._id);
          // self.reservedParkings.splice(parkingIdx, 1)
          this.reservedParkings = this.reservedParkings.filter(currParking => currParking._id !== parking._id);
          // self.reservedParkings.splice(parkingIdx, 1)
        });
    },
    editParking(parking){
      console.log('editParking:',parking)
    }
  },
  created() {
    this.loadParkingsActivity();
  },
  computed: {
    reserved() {
      console.log("my reserved parkings: ", this.reservedParkings);
      return this.reservedParkings.length > 0;
    }
  },
  components: {
    myParkingPreview
  }
};
</script>

<style scoped lang="scss">
.parking-details {
  text-align: left;
}

.parking-details li {
  margin-bottom: 10px;
}

.my-parkings {
  text-transform: uppercase;
  letter-spacing: 1px;
}
.parking-img {
  width: 200px;
  height: 200px;
  margin-right: 20px;
}
.reserved-parkings,
.my-details {
  margin-bottom: 20px;
}

.no-underline {
  text-decoration: none;
}
.el-tabs {
  max-width: 1000px;
  margin: auto;
}

section {
  margin-top: 30px;
}

h2 {
  margin-bottom: 10px;
}

img {
  box-shadow: 0px 1px 2px 2px #60626673;
}

.el-button {
  width: 100%;
}
.profile-image {
  width: 200px;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 50%;
}

.parking-image {
  position: relative;
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
  background-color: hotpink;
  outline: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
}

.hidden-map {
  z-index: -1;
}
.profile-details {
  max-width: 70%;
  margin: 0 auto;
}

@media (max-width: 1060px) {
  section {
    margin: 30px;
  }
}

@media (max-width: 650px) {
  .profile-details {
    flex-direction: column;
  }
  .profile-image {
    margin: 30px auto;
  }
}

@media (max-width: 440px) {
  .profile-details {
    max-width: 100%;
  }
  .profile-image {
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 350px) {
  .profile-image {
    width: 150px;
    height: 150px;
  }
}
</style>
