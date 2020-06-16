import axios from 'axios';

const api = axios.create({
    /// O fato de podermos utilizar uma URL base é o motivo para utilizarmos a lib axios
    baseURL: 'http://localhost:3333'
});

export default api;
