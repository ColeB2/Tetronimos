import axios from 'axios';

export default axios.create({
    baseURL: 'https://tetronimos-db.cebcole.workers.dev'
})
