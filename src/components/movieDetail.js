import { useParams, useNavigate } from 'react-router-dom';

export const MovieDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    return (
        <>
            <h1>Movie From {id}</h1>
            <button
                className='btn btn-primary'
                onClick={() => navigate('/movies', { replace: true })}>
                Save
            </button>
        </>
    );
};
