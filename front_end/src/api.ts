import axios from 'axios';


const api = axios.create({
  baseURL:'http://localhost:4242'
})

export default api;