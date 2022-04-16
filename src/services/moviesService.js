import http from './httpService';

const endPoint = 'http://localhost:3000/api/movies';

export const getMovies = async () => {
    return await http.get(endPoint);
};

export const saveMovie = (movie) => {
    if (movie._id) {
        const { _id, ...body } = movie;
        return http.put(`${endPoint}/${movie._id}`, body);
    } else return http.post(`${endPoint}`, movie);
};

export const getMovie = async (movieId) => {
    return await http.get(`${endPoint}/${movieId}`);
};

export const deleteMovie = async (movieId) => {
    return await http.delete(`${endPoint}/${movieId}`);
};
