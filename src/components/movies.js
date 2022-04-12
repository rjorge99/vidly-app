import { useEffect, useState } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';
import { ListGroup } from './commons/listGroup';
import { Pagination } from './pagination';
import { MoviesTable } from './moviesTable';
import _ from 'lodash';

export const Movies = () => {
    const [state, setState] = useState({
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: [],
        selectedGenre: null,
        sortColumn: { path: 'title', order: 'asc' }
    });

    const { pageSize, currentPage, movies: allMovies, genres, selectedGenre, sortColumn } = state;

    useEffect(() => {
        const genres = [{ name: 'All Genres', _id: '' }, ...getGenres()];
        const movies = getMovies();

        setState({
            ...state,
            movies: movies,
            genres
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

    const onHandleGenreSelect = (genre) => {
        setState({
            ...state,
            currentPage: 1,
            selectedGenre: genre
        });
    };

    const handleSort = (path) => {
        let currentSortColumn = { ...sortColumn };
        if (currentSortColumn.path === path) {
            currentSortColumn.order = currentSortColumn.order === 'asc' ? 'desc' : 'asc';
        } else currentSortColumn = { path, order: 'asc' };
        console.log(sortColumn);
        setState({
            ...state,
            sortColumn: currentSortColumn
        });
    };

    if (allMovies.length === 0) return <p>There are no movies in the database</p>;

    const filtered =
        selectedGenre && selectedGenre._id
            ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
            : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return (
        <>
            <div className='row'>
                <div className='col-4'>
                    <ListGroup
                        selectedItem={selectedGenre}
                        items={genres}
                        onItemSelect={onHandleGenreSelect}
                    />
                </div>
                <div className='col'>
                    <p>Showing {filtered.length} movies in the database</p>
                    <MoviesTable
                        onSort={handleSort}
                        movies={movies}
                        onLike={handleLike}
                        onDelete={handleDelete}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalItems={filtered.length}
                        pageSize={pageSize}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        </>
    );
};
