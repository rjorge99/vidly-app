import { useEffect, useState } from 'react';
import { deleteMovie, getMovies } from '../services/fakeMovieService';

export const Movies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        setMovies(getMovies());
    }, []);

    const handleDelete = (movie) => {
        setMovies(movies.filter((m) => m._id !== movie._id));
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
                    </tr>
                </thead>
                <tbody>
                    {movies.map((m) => (
                        <tr key={m._id}>
                            <td>{m.title}</td>
                            <td>{m.genre.name}</td>
                            <td>{m.numberInStock}</td>
                            <td>{m.dailyRentalRate}</td>
                            <td>
                                <button
                                    className='btn btn-danger btn-sm'
                                    onClick={() => handleDelete(m)}>
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
