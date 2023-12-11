import axios from 'axios';

export default axios.create({
    baseURL: 'https://tetronimos-worker.cebcole.workers.dev',
    headers: {
        'Content-Type': 'application/json'
    }
});