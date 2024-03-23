import axios from 'axios';
const BASE_URL = 'https://mas-server-418022.uc.r.appspot.com';

export default axios.create({
    baseURL: BASE_URL
});