import axios from 'axios';

const URL = process.env.REACT_APP_DEBUG_MODE+'' === 'true' ? 
    process.env.REACT_APP_API_URL_QA : process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: URL
});

export default api;
