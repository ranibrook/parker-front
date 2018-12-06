import  Notification  from 'element-ui';
import axios from 'axios'

const PARKING_URL = (process.env.NODE_ENV !== 'development')
    ? '/parking'
    : '//localhost:3000/parking';


function addRandomParking() {
    const newParking = {        
            location: {
              lat: 32.088,
              lng: 34.801
            },
            address: "Anne Frank 16, Ramat Gan",
            occupiedUntil: 0,
            reserverId: "",
            ownerId: "5b583081f6d632e56ebd6a45",
            price: 18,
            amenities: {
              isCovered: true,
              isPaved: true,
              isForDisable: false
            },
            description: "A covered parking 2 minutes walking from the Bursa area in Ramat Gan. Low rates, optional full day renting.",
            createdAt: Date.now(),
            iconUrl: "/img/available-position-48x48.png",
            imageURL: "https://geo3.ggpht.com/maps/photothumb/fd/v1?bpb=ChAKDnNlYXJjaC5UQUNUSUxFEmUKNwm3urAoxEsdFRHphEl1w6dxThojCxDThbhCGhoSGAoUChIJt7qwKMRLHRURU3v3Q1x0N8MQEAwSCg2ibiATFWCkvhQaEgmdOFVqxEsdFRHdQklRXTc45SoKDYNrIBMVPKC-FBoGCMgBEJgD&gl=IL"
          }
          return axios.post(PARKING_URL + '/add', newParking)
}

function showNewParking() {
    setTimeout(showNewParkingNotification, 3000)
    }

function showNewParkingNotification() {
        return new Notification({
        title: 'we have great news for you!',
        message: 'a new parking was just released!',
        type: 'info',  
        duration: 0      
        });
    }

export default {
    showNewParking,
    addRandomParking
}