const USER_URL = (process.env.NODE_ENV !== 'development')
    ? '/user'
    : '//localhost:3000/user';

import axios from 'axios'

function getUserById(userId) {
    return axios.get(`${USER_URL}/${userId}`)
    .then(res => {
        return res.data
    })
}

function login(userInfo) {
    return axios.post(`${USER_URL}/checkLogin`, userInfo)
        .then(res => {
            return (res.data)
        })
}

function addUser(newUser) {
    return axios.post(`${USER_URL}/add`, newUser)
        .then(res => {
            return (res.data)
        })
}




export default {
    getUserById,
    login,
    addUser
}