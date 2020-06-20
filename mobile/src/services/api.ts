import axios from 'axios';

const api = axios.create({
    // The IP should be of your API server, listening to door 3333.
    baseURL: 'http://192.168.15.5:3333'
});

export default api;
