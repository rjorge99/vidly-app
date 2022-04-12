import { useEffect, useState } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { Like } from './commons/like';

export const Movies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        setMovies(getMovies());
    }, []);

    const handleDelete = (movie) => {
        setMovies(movies.filter((m) => m._id !== movie._id));
    };

    const handleLike = (movie) => {
        setMovies(
            movies.map((m) =>
                m._id !== movie._id
                    ? m
                    : {
                          ...m,
                          liked: !m.liked
                      }
            )
        );
    };

    if (movies.length === 0) return <p>There are no movies in the database</p>;

    return (
        <>
            <p>Showing {movies.length} movies in the database</p>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>Title</th>
                        <th scope='col'>Genre</th>
                        <th scope='col'>Stock</th>
                        <th scope='col'>Rate</th>
                        <th scope='col'></th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>
                                <Like liked={movie.liked} onClick={() => handleLike(movie)} />
                            </td>
                            <td>{movie.dailyRentalRate}</td>
                            <td>
                                <button
                                    className='btn btn-danger btn-sm'
                                    onClick={() => handleDelete(movie)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
