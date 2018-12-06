<template>   

    <section v-if="user">

         <el-tabs type="border-card">
            <el-tab-pane label="Reserved Parkings">
                 <div v-show="reserved" class="reserved-parkings">           
                    <h2 v-if="reservedParkings.length > 0">My Reserved Parkings:</h2>
                    <ul>
                        <li v-if="parking.occupiedUntil !== 0" v-for="parking in reservedParkings" :key="parking._id">                         
                            <router-link class="no-underline" :to="`/parking/${parking._id}`">
                                <el-card class="box-card">
                                    <div class="flex space-between">
                                        <img  :src="parking.imageURL">
                                        <div class="flex column space-between">
                                            <div class="flex column">
                                                <h3> {{parking.address}} </h3>
                                                <h3> ₪ {{parking.price}} per hour </h3>
                                                <h3> ends {{convertTimestamp(parking.occupiedUntil)}}</h3>
                                            </div>
                                            <div>
                                              <button @click.prevent="stopParking(parking)">Stop Parking</button>  
                                            </div>
                                        </div>
                                        <GmapMap
                                            :center="parking.location"
                                            :zoom="15"
                                            map-type-id="terrain"
                                            style="width: 300px"
                                        >
                                        <GmapMarker                                               
                                            :position="parking.location"
                                            :clickable="true"
                                            :draggable="false"
                                            @click.prevent="center=m.position" />
                                        </GmapMap>
                                    </div>
                                </el-card> 
                            </router-link>                          
                        </li>
                    </ul>
                </div>

            </el-tab-pane>

            <el-tab-pane label="Owned Parkings">
                 <div class="owned-parkings">
                    <h2>My Owned Parkings</h2>
                    <ul>
                        <li v-for="parking in ownedParkings" :key="parking._id">
                            <router-link class="no-underline" :to="`/parking/${parking._id}`">
                                <el-card class="box-card">
                                <div class="flex space-between">
                                    <img :src="parking.imageURL" alt="my owned parkings" />
                                    <div class="flex column">
                                        <h3> {{parking.address}}</h3>
                                        <h3>₪ {{parking.price}} per hour</h3>
                                        <h3>{{(parking.reserverId)? 'Occupied' : 'Available for rent'}}</h3>
                                    </div>
                                    <GmapMap
                                            :center="parking.location"
                                            :zoom="15"
                                            map-type-id="terrain"
                                            style="width: 300px"
                                        >
                                    <GmapMarker                                               
                                            :position="parking.location"
                                            :clickable="true"
                                            :draggable="false"
                                            @click="center=m.position" />
                                    </GmapMap>
                                </div>
                                </el-card>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </el-tab-pane> 

            <el-tab-pane label="Profile">
               <div class="my-details">
                     <h2>My Details</h2>
                     <el-card class="box-card">
                        <p>Name: {{user.firstName}} {{user.lastName}}</p>
                        <p>email: {{user.email}}</p>
                     </el-card>
               </div>
            </el-tab-pane>  

        </el-tabs>


    </section>

</template>