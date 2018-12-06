
var map;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap'); 
    return _connectGoogleApi()
    .then(() => {
        console.log('google available');
        map = new google.maps.Map(
            document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
        console.log('Map!', map);
    })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    console.log('marker', marker)
    return marker;
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyDXtbBnFfIsE_Zn-6D4r2RtCrjk-9lvxvs';
   
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;

    elGoogleApi.async = true;
    document.body.append(elGoogleApi);
    
    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
      
    })
}


function centerMap(lat,lng) {
    var latLng = new google.maps.LatLng(lat, lng);
    map.setCenter(latLng);
}

function loadLocation(value) {

    const API_KEY = 'AIzaSyDXtbBnFfIsE_Zn-6D4r2RtCrjk-9lvxvs';
    return  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${API_KEY}`)
    .then(function(res){
        return res.data
    })
} 



export default {
    initMap,
    addMarker,
    centerMap,
    loadLocation
    
}