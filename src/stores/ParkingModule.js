import ParkingService from '../../services/ParkingService.js'
import LocService from '../../services/LocService'
import { eventBus } from '../../services/EventBusService.js'


export default {
    state: {
        parkings: [],
        position: {
            lat: 0,
            lng: 0
        },
        component: 'ParkingFilter',
        latLng: {},
        isSearch: false,
        filterBy: {
            distance: 100,
            isPaved: '',
            isCovered: '',
            isForDisable: ''
        }
    },
    getters: {
        parkingToDisplay(state) {
            return state.parkings.filter(parking => {
                if (state.filterBy.isPaved) {
                    return parking.amenities.isPaved
                } else {
                    return true
                }
            })
                .filter(parking => {
                    if (state.filterBy.isCovered) {
                        return parking.amenities.isCovered
                    } else {
                        return true
                    }
                })
                .filter(parking => {
                    if (state.filterBy.isForDisable) {
                        return parking.amenities.isForDisable
                    } else {
                        return true
                    }
                })
                .filter(parking => {
                    var distance = LocService.getDistanceFromLatLonInKm(
                        state.position.lat,
                        state.position.lng,
                        parking.location.lat,
                        parking.location.lng
                    )
                    parking.distance = distance
                    return distance < state.filterBy.distance
                })
                .sort((a, b) => {
                    if (+a.distance > +b.distance) return 1
                    else return -1
                })
        },
        componentToShow(state) {
            return state.component
        },

        p: (state) => state.latLng,

        position: (state) => state.position,
        search(state) {
            return state.isSearch
        }
    },

    mutations: {
        setParkings(state, { parkings }) {
            state.parkings = parkings
        },
        reserveParking(state, { parking }) {
            var idx = state.parkings.findIndex(currParking => currParking._id === parking._id)
            state.parkings.splice(idx, 1, parking)                        
        },
        stopParking(state, { parking }) {
            var idx = state.parkings.findIndex(currParking => currParking._id === parking._id)
            state.parkings.splice(idx, 1, parking)
        },

        addParking(state, { newParking }) {
            state.parkings.unshift(newParking)
        },

        removeParking(state, { id }) {
            state.parkings = state.parkings.filter(item => item._id !== id);
        },

        editParking(state, { editedParking }) {
            
            state.parkings = state.parkings.filter(item => item._id !== editedParking._id);
            state.parkings.unshift(editedParking)
        },
        setPosition(state, payload) {
            state.position.lat = payload.lat
            state.position.lng = payload.lng

            state.latLng.lat = payload.lat
            state.latLng.lng = payload.lng
        },
        updateFilter(state, { filterBy }) {
            state.filterBy = filterBy
        },
        addNewParking(state, { parkingToAdd }) {
            state.parkings.push(parkingToAdd)

        }


    },
    actions: {
        loadParkings(context) {
            return ParkingService.query(context.getters.position)
                .then((parkings) => {
                    context.commit({ type: 'setParkings', parkings })
                    
                    return parkings
                })
        },

        reserveParking(context, { parking }) {
            return ParkingService.reserveParking(parking)
                .then(parking => {
                    console.log('parking after returning from MDB: ', parking)
                    context.commit({ type: 'reserveParking', parking })
                })
        },

        stopParking(context, { parking }) {
            parking.occupiedUntil = 0
            parking.reserverId = '' 
            parking.iconUrl = '/img/available-position-48x48.png'          
            return ParkingService.stopParking(parking)
                .then((parking) => {
                    context.commit({ type: 'stopParking', parking })
                })
        },
        addParking(context, { newParking }) {

            return ParkingService.addParking(newParking)
                .then((res) => {
                    context.commit({ type: 'addParking', newParking: res.data })
                    return res.data
                })
        },
        editParking(context, { editedParking }) {
            return ParkingService.editParking(editedParking)
                .then((res) => {
                    context.commit({ type: 'editParking', editedParking: res })
                    return res

                })
        },
        removeParking(context, { id }) {
            return ParkingService.remove(id)
                .then(() => {
                    context.commit({ type: 'removeToy', id });

                });

        }
    }

}