import axios from 'axios'; 

const client = axios.create ({
    baseURL: 'http://174.56.108.204:8000',
});

export const checkServer = async () => {
    const response = await client.get('/health');
    console.log(response.data);
};