import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import Joi from 'joi-browser';
import { useCallback, useEffect, useState } from 'react';
import { getMovie, saveMovie } from '../services/moviesService';
import { getGenres } from '../services/genresService';

export const MovieForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);

    const getGenresData = useCallback(async () => {
        const { data: genres } = await getGenres();
        setGenres(genres);
    }, []);

    const getMovieData = useCallback(async () => {
        if (id === 'new') return;

        try {
            const { data: movie } = await getMovie(id);
            setData(mapToViewModel(movie));
        } catch (error) {
            if (error.response && error.response.status === 404)
                return navigate('/not-found', { replace: true });
        }
    }, []);

    useEffect(() => {
        getGenresData();
    }, [getGenresData]);

    useEffect(() => {
        getMovieData();
    }, [getMovieData]);

    const { renderInput, handleSubmit, formState, renderButton, renderSelect, setData } = useForm({
        data: {
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRate: ''
        },
        errors: {},
        schema: {
            _id: Joi.string(),
            title: Joi.string().required().label('Title'),
            genreId: Joi.string().required().label('Genre'),
            numberInStock: Joi.number().required().min(0).max(100).label('Number in Stock'),
            dailyRentalRate: Joi.number().required().min(1).max(10).label('Daily Rental Rate')
        }
    });

    const mapToViewModel = (movie) => {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    };

    const { errors, data: movie } = formState;

    const onSubmit = async (e) => {
        handleSubmit(e);
        if (Object.keys(errors).length) return;
        await saveMovie(movie);
        navigate('/movies', { replace: true });
    };

    return (
        <>
            <h1>Movie From {id}</h1>
            <form onSubmit={onSubmit}>
                {renderInput('Title', 'title')}
                {renderSelect('Genre', 'genreId', genres)}
                {renderInput('Number in Stock', 'numberInStock')}
                {renderInput('Rate', 'dailyRentalRate')}
                {renderButton('Save')}
            </form>
        </>
    );
};
