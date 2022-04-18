import axios from 'axios';
import { toast } from 'react-toastify';
import logger from './logService';

axios.interceptors.response.use(null, (error) => {
    const expectedError =
        error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedError) {
        logger.log(error);
        toast.error('An error has occurred');
    }

    return Promise.reject(error);
});

export const setJwt = (jwt) => {
    axios.defaults.headers.common['x-auth-token'] = jwt;
};

export default {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    put: axios.put,
    setJwt
};
