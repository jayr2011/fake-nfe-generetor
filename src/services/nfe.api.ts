import axios from 'axios';

const api = axios.create({
    baseURL: 'https://nfe-api-jeir.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;