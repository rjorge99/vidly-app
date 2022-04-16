import http from './httpService';

const endPoint = 'http://localhost:3000/api/movies';

export const getMovies = async () => {
    return await http.get(endPoint);
};
export const deleteMovie = async (movieId) => {
    return await http.delete(`${endPoint}/${movieId}`);
};
