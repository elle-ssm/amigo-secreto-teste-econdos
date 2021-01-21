import axios from 'axios';


const api = axios.create({
  baseURL:'https://localhost:4242'
})

export default api;