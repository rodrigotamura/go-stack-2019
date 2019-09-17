import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333' // 3333 because of json-server port configured
});

export default api;
