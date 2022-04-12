import { useEffect, useState } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';
import { Like } from './commons/like';
import { Pagination } from './pagination';

export const Movies = () => {
    const [state, setState] = useState({
        movies: [],
        pageSize: 4,
        currentPage: 1
    });

    const { length: count } = state.movies;
    const { pageSize, currentPage, movies: allMovies } = state;

    useEffect(() => {
        setState({
            ...state,
            movies: getMovies()
        });
    }, []);

    const handleDelete = (movie) => {
        setState({
            ...state,
            movies: state.movies.filter((m) => m._id !== movie._id)
        });
    };

    const handleLike = (movie) => {
        setState({
            ...state,
            movies: state.movies.map((m) =>
                m._id !== movie._id
                    ? m
                    : {
                          ...m,
                          liked: !m.liked
                      }
            )
        });
    };

    const onPageChange = (page) => {
        setState({
            ...state,
            currentPage: page
        });
    };

    if (allMovies.length === 0) return <p>There are no movies in the database</p>;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
        <>
            <p>Showing {state.movies.length} movies in the database</p>
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
            <Pagination
                currentPage={currentPage}
                totalItems={count}
                pageSize={pageSize}
                onPageChange={onPageChange}
            />
        </>
    );
};
