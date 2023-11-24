import axios from 'axios'

// https://climei.azurewebsites.net/api/v1
// 'http://192.168.0.12:8080/api/v1'
const api = axios.create({
  baseURL: 'https://climei.azurewebsites.net/api/v1'
})

export default api
