<template>
    <section class="parking-section">
 
       <form @submit.prevent="editParking" class="edit-parking-form" > 
          <h3> Edit Parking </h3>
            <div class="edit-margin">
             <input placeholder="Please input Address" v-model="parkingToEdit.address" type="text" ref="placeAutocomplete" class="el-input__inner"> 
             </div>          
            <div>
            <p>Price in ₪:</p>  <el-input-number v-model="parkingToEdit.price" :min="1" ></el-input-number>
            </div>
            <div class="amenities-section edit-margin">
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
            
             <el-button type="success" @click="editParking">Confirm Edit Parking</el-button>             
        </form>


        <FooterCmp />
    </section>
</template>

<script>
import CloudinaryService from "../../services/CloudinaryService.js";
import FooterCmp from '@/components/FooterCmp.vue'
import StorageService from '../../services/StorageService.js';
import ParkingService from '../../services/ParkingService.js';



export default {
  props: ["parking"],
  name: "EditParking",
 
  data() {
    return {
      parkingEdit: null,
      
      fileLabelTxt: "Load Image",
      
    };
  },
  components:{
  FooterCmp,

  },
  computed: {
    parkingToEdit() {
      return this.parkingEdit;
    },
    user() {
      return this.$store.getters.loggedInUser;
    }
  },
  created() {
  
    this.loadParkingId()
   
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
        this.parkingToEdit.location.lat = place.geometry.location.lat();
        this.parkingToEdit.location.lng = place.geometry.location.lng();
        this.parkingToEdit.address = place.formatted_address;
      });
    });
  },

  methods: {
     loadParkingId(){
        var parkingId = this.$route.params.id
        return ParkingService.getById(parkingId)
        .then(res => {
            this.parkingEdit = res.parking;
            console.log('res:',res);
            
        })
     },

    editParking() { 

      if (this.user._id !== this.parkingToEdit.ownerId) {
        this.$router.push("/login");
      } else {
        if ((!this.parkingToEdit.address) || (this.parkingToEdit.location.lat === 0) || (this.parkingToEdit.location.lng === 0)){
         this.alert('The address not valid!  please insert valid address');
        } else {
        const editedParking = this.parkingToEdit;
          this.$store
            .dispatch({ type: "editParking", editedParking })
            .then(res => {
              // reditect to the parking details page with vue router.push
              this.$router.push(`/parking/${editedParking._id}`);
            })
            .catch(err => {
             this.alert('Failed to save parking, please try later');
             console.log('Failed to save parking, please try later');
              
            });
        }

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

.load-img-lbl,.edit-margin{
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

.edit-parking-form{
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


