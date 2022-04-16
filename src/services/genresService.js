import http from './httpService';

export const getGenres = async () => {
    // TODO: meter esta url a config
    return await http.get('http://localhost:3000/api/genres');
};
