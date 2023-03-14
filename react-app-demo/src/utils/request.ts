import axios from 'axios';
const request = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true
});

request.interceptors.request.use(
    (config) => {
        return config;
    },
    (err) => {
        console.log('~~~请求错误~~~');
    }
);

request.interceptors.response.use((response) => {
    return response.data;
});

export default request;
