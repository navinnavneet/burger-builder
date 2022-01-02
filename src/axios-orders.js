import axios from 'axios';

const instance = axios.create({
    baseURL: "https://my-burger-f37ef-default-rtdb.firebaseio.com/"
});

export default instance;