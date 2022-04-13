import { Like } from './commons/like';
import { Table } from './commons/table';
import { Link } from 'react-router-dom';

export const MoviesTable = ({ movies, onDelete, onLike, onSort, sortColumn }) => {
    const columns = [
        {
            path: 'title',
            label: 'Title',
            content: (movie) => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' },
        {
            key: 'like',
            content: (movie) => <Like liked={movie.liked} onClick={() => onLike(movie)} />
        },
        {
            key: 'delete',
            content: (movie) => (
                <button className='btn btn-danger btn-sm' onClick={() => onDelete(movie)}>
                    Delete
                </button>
            )
        }
    ];

    return <Table data={movies} columns={columns} onSort={onSort} sortColumn={sortColumn} />;
};
