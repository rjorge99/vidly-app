import { useEffect, useState } from 'react';
import { deleteMovie, getMovies, updateMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';
import { ListGroup } from './commons/listGroup';
import { Pagination } from './pagination';
import { MoviesTable } from './moviesTable';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { SearchBox } from './commons/searchBox';

export const Movies = () => {
    const [state, setState] = useState({
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: [],
        selectedGenre: null,
        sortColumn: { path: 'title', order: 'asc' },
        searchQuery: ''
    });

    const {
        pageSize,
        currentPage,
        movies: allMovies,
        genres,
        selectedGenre,
        sortColumn,
        searchQuery
    } = state;

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

        deleteMovie(movie._id);
    };

    const handleLike = (movie) => {
        movie = { ...movie, liked: !movie.liked };
        setState({
            ...state,
            movies: state.movies.map((m) => (m._id !== movie._id ? m : movie))
        });
        updateMovie(movie);
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
            selectedGenre: genre,
            searchQuery: ''
        });
    };

    const handleSort = (sortColumn) => {
        setState({
            ...state,
            sortColumn
        });
    };

    const searchChanged = (query) => {
        setState({
            ...state,
            searchQuery: query,
            selectedGenre: null,
            currentPage: 1
        });
    };

    const getPageData = () => {
        let filtered = allMovies;

        if (searchQuery) {
            filtered = filtered.filter((m) =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        }
        if (selectedGenre && selectedGenre._id)
            filtered = filtered.filter((m) => m.genre._id === selectedGenre._id);

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return {
            totalCount: filtered.length,
            data: movies
        };
    };

    if (allMovies.length === 0) return <p>There are no movies in the database</p>;

    const { totalCount, data: movies } = getPageData();

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
                    <Link to='/movies/new' className='btn btn-primary'>
                        New movie
                    </Link>
                    <p>Showing {totalCount} movies in the database</p>
                    <SearchBox onChange={searchChanged} className='form-control my-3' />
                    <MoviesTable
                        onSort={handleSort}
                        movies={movies}
                        onLike={handleLike}
                        onDelete={handleDelete}
                        sortColumn={sortColumn}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalCount}
                        pageSize={pageSize}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        </>
    );
};
