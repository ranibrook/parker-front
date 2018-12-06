<template>
    <section class="parking-section">
 
       <form @submit.prevent="addParking" class="add-parking-form" > 
          <h3> Add New Parking </h3>
<!--          <div v-if="isAddParking" class="add-parking">  -->
            <div class="add-margin">
             <input placeholder="Please input Address" v-model="parkingToEdit.address" type="text" ref="placeAutocomplete" class="el-input__inner"> 
             </div>          
            <div>
            <p>Price in ₪:</p>  <el-input-number v-model="parkingToEdit.price" :min="1" ></el-input-number>
            </div>
            <div class="amenities-section add-margin">
             <div><el-checkbox v-model="parkingToEdit.amenities.isCovered">Covered</el-checkbox></div>
             <div><el-checkbox v-model="parkingToEdit.amenities.isPaved">Paved</el-checkbox></div>
             <div><el-checkbox v-model="parkingToEdit.amenities.isForDisable">For disabled</el-checkbox></div>
             </div>
             <div class="flex align-center">
            <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="Please insert a description"
                    v-model="parkingToEdit.description"
                    >
                    </el-input>     
            </div>
            <div>
              <input class="load-img-btn" type="file" id="LoadImageBtn" name="img"
               @change="loadImg($event.target, $event)"/>
              

               <label for="LoadImageBtn" class="load-img-lbl el-button el-button--primary el-button--small">{{fileLabelTxt}}</label>
            </div>
            
             <el-button type="success" @click="addParking">Confirm New Parking</el-button>             
<!--          </div>  -->
        </form>


        <FooterCmp />
    </section>
</template>

<script>
import CloudinaryService from "../../services/CloudinaryService.js";
import FooterCmp from '@/components/FooterCmp.vue'
import StorageService from '../../services/StorageService.js';



export default {
  name: "AddParking",
  data() {
    return {
      parkingToAdd: 
      {
        location: {
          lat: 0,
          lng: 0
        },
        address: "",
        occupiedUntil: "0",
        iconUrl: "/img/available-position-48x48.png",
        reserverId: "",
        ownerId: "",
        price: "0",
        amenities: {
          isCovered: false,
          isPaved: true,
          isForDisable: false
        },
        description: "",
        createdAt: 0,
        imageURL: "http://res.cloudinary.com/parker1/image/upload/v1533190733/e8iuj1et9h7mwylwhe5x.jpg"
      },
      fileLabelTxt: "Load Image",
      
    };
  },
  components:{
  FooterCmp,

  },
  computed: {
    parkingToEdit() {
      return this.parkingToAdd;
    },
    user() {
      return this.$store.getters.loggedInUser;
    }
  },
  created() {
    this.reLoadParkingToAdd()  
  },
  mounted() {
    console.log('gmap promise lazy: ', this.$gmapApiPromiseLazy())
    //for loading map
    this.$gmapApiPromiseLazy().then(google => {
      var autocomplete = new google.maps.places.Autocomplete(
        this.$refs.placeAutocomplete
      );
      autocomplete.addListener("place_changed", x => {
        var place = autocomplete.getPlace();
        this.parkingToAdd.location.lat = place.geometry.location.lat();
        this.parkingToAdd.location.lng = place.geometry.location.lng();
        this.parkingToAdd.address = place.formatted_address;
      });
    });
  },

  methods: {
    addParking() {

      console.log('this.parkingToAdd.location.lat',this.parkingToAdd.location.lat);
      
      if (!this.user._id) {
        StorageService.store('parking-to-add', this.parkingToEdit)    
        this.$router.push("/login");
      } else {
        if ((!this.parkingToAdd.address) || (this.parkingToAdd.location.lat === 0) || (this.parkingToAdd.location.lng === 0)){
         this.alert('The address not valid!  please insert valid address');
        } else {
        let newParking = this.parkingToEdit;
          newParking.ownerId = this.user._id;

          this.$store
            .dispatch({ type: "addParking", newParking })
            .then(res => {
              // reditect to the parking details page with vue router.push
              this.$router.push(`/parking/${res._id}`);
              localStorage.removeItem('parking-to-add')
            })
            .catch(err => {
             this.alert('Failed to save parking, please try later');
             console.log('Failed to save parking, please try later');
              
            });
        }

      }
      
    },

    reLoadParkingToAdd () {
      var parkingToAdd = StorageService.load('parking-to-add')
      if (parkingToAdd) {
        this.parkingToAdd = parkingToAdd
      } else {
        return
      }
    },

     alert(message) {
      this.$alert(message, "Alert", {
        confirmButtonText: "OK",
      })},

    
    loadImg(elPic, ev) {  
      CloudinaryService.uploadImg(elPic, ev).then(res => {  
        console.log('img url res: ', res)      
        this.parkingToEdit.imageURL = res;        
      });

      this.fileLabelTxt = ev.target.value.split( '\\' ).pop();
      if(!this.fileLabelTxt) this.fileLabelTxt = "Load Image";      
    }
  }
};
</script>

<style scoped lang="scss">
h3{
  color: #2c3e50
}
p{
  color: #409EFF;
}
.load-img-btn {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.load-img-lbl,.add-margin{
  margin: 10px
}
.el-textarea__inner {
  width: 300px;
}

.parking-section{
  text-align: center;
}

.amenities-section{
  text-align: left;
  padding-left: 40px;
}

.add-parking-form{
  width: 300px;
  display: inline-block;
  justify-content:center;
  align-items: center;
  border-style: solid;
  margin-top:70px;
  border-width: 1px;
  border-color:lightsteelblue;
  padding: 10px;
  
}
</style>


