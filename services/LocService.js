const GOOGLE_API_KEY = 'AIzaSyDXtbBnFfIsE_Zn-6D4r2RtCrjk-9lvxvs'
import axios from 'axios';
 

function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function getDirections(origin, destination) {
    console.log('origin: ', origin)
    console.log('destination: ', destination)
    return axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_API_KEY}`)
    .then ((res) => {
        console.log('results: ', res)
        return res.data
    })
}

function initMap(userLocation) {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    // var userLoc = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
      zoom: 15,
      center: userLocation
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
  }

function calcRoute(userLocation, parkingLocation) {  
        var start = userLocation
        var end = parkingLocation
        var request = {
          origin:start,
          destination:end,
          travelMode: 'DRIVING'
        };
}


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }



export default {
    getPosition,
    getDirections,
    calcRoute,
    initMap,
    getDistanceFromLatLonInKm
}