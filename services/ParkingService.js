import axios from 'axios'
import { log } from 'util';
const PARKING_URL = (process.env.NODE_ENV !== 'development')
    ? '/parking'
    : '//localhost:3000/parking';

function query({lat, lng}) {
    return axios.get(PARKING_URL+`?lat=${lat}&lng=${lng}`)
    .then(res => res.data)
}


function getById(parkingId) {
    return axios.get(`${PARKING_URL}/${parkingId}`)
    .then(res => res.data)     
}

function addParking(newParking) {
    return axios.post(PARKING_URL + '/add', newParking)
}

function editParking(editedParking){
    return axios.put(`${PARKING_URL}/${editedParking.parkingId}`, editedParking)
        .then(res => {

           return res.data})
        
}

function reserveParking(parkingReserved){
    return axios.put(`${PARKING_URL}/reserve/${parkingReserved.parkingId}`, parkingReserved)
        .then(res => {
           return res.data})
        
}



function stopParking(parking) {  
    return axios.put(`${PARKING_URL}/stop`, parking)
    .then(res => res.data)
}

export default {
    query,
    getById,
    reserveParking,
    stopParking,  
    reserveParking,
    addParking,
    editParking
}
