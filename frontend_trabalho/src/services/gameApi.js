import axios from 'axios';

const gameAPI = axios.create({
    baseURL:"http://localhost:3000"
})

export default gameAPI;