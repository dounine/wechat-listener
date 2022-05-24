import axios from 'axios';

let api_base_url = ''
// vite
if (import.meta.env.NODE_ENV === 'development') {
    api_base_url = 'https://client.doubilm.com'
} else if (import.meta.env.NODE_ENV === 'production') {
    api_base_url = 'https://client.doubilm.com'
}
let instance = axios.create({
    timeout: 1000 * 3,
    baseURL: api_base_url,
    // headers: {
    //   'Content-Type': 'application/json;charset=UTF-8',
    // },
});

export default instance;