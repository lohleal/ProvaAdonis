import axios from 'axios';

const Client = axios.create({
    
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default Client;