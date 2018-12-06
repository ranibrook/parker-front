<template >
  <router-link class="text-decoration" :to="'parking/'+parking._id ">
    <section class="section-parking-preview">
        <el-card class="box-card" :class = "{occupied : isOccupied}">
        <div class="parking-box flex">
            <img class="img-parking mr" :src="parking.imageURL" alt="parking">
            <div class="parking-box-details flex column space-between">
                <div class="flex space-between">
                <h5>{{parking.address}}</h5>
                <p>{{parking.price}}₪</p>
                </div>
                <p class="flex distance">{{distance}} </p>
                <div class="amenities flex">
                    <p v-if="parking.amenities.isPaved"><i class="fas fa-road"></i></p>
                    <p v-if="parking.amenities.isForDisable"><i class="fas fa-wheelchair"></i></p>
                    <p v-if="parking.amenities.isCovered"><i class="fas fa-parking"></i></p>
                </div>
                <div class="container-btns" style="display: flex">
                    <el-button type="info" >Details</el-button>
                    <el-button v-if="!isOccupied" type="success"  :disabled="isOccupied" @click.prevent="$router.push('/reserve/'+parking._id)">
                            Reserve
                    </el-button>
                </div>
        </div>
            </div>
        </el-card>

    </section>
 </router-link>

</template>

<script>



export default {
    computed:{
        isOccupied(){
            return this.parking.occupiedUntil > Date.now()
        },
        distance(){
            var distance = this.parking.distance
             if (distance > 1) {
                return distance.toFixed(2) + " km from you"
            }
            else {
                return distance.toFixed(3)*1000 + " meters from you"
            }          
        }
    },
    props:{
        parking:Object
    },
    
}
</script>

<style scoped lang="scss">

.text-decoration:hover{
    text-decoration: none;
}

.box-card .el-card__body {
    padding: 8px;
}
.parking-box-details{
    flex: 1;
    h5 {
        text-align: left;
    }
}

.img-parking {
  height: 120px;
  width: 120px;
  object-fit: cover;
  border-radius: 3px;
}

.mr {
  margin-right: 20px;
}

.distance{
    font-size: 13px;
}

.box-card:hover {
  background-color: rgb(217, 255, 181);
}

.amenities p{
    margin-right: 15px;
}

.occupied {
    background-color: rgb(219, 219, 219);
    opacity: .3;
        &:hover{
            background-color: rgb(219, 219, 219);
        }
}

@media(max-width: 770px){
    .amenities{
        display: none;
    }
    .img-parking{
        height: 80px;
        width: 80px;
    }

.container-btns > * {
    width: 50%;
}

}


</style>
