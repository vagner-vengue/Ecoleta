import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

const api = axios.create({
    // The address of your API server.
    baseURL: API_URL
});

export default api;
