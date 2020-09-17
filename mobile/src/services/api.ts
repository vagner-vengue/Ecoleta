import axios from 'axios';
import { API_URL, API_URL_QA, DEBUG_MODE } from 'react-native-dotenv';

const URL = (DEBUG_MODE=='true') ? API_URL_QA : API_URL;

const api = axios.create({
    // The address of your API server.
    baseURL: URL
});

export default api;
