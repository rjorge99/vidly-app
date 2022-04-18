import Joi from 'joi-browser';
import { useForm } from '../hooks/useForm';
import auth from '../services/authService';

export const LoginForm = () => {
    const schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    };

    const { formState, handleSubmit, renderInput, renderButton, setErrors } = useForm({
        data: {
            username: '',
            password: ''
        },
        errors: {},
        schema
    });

    const { errors } = formState;
    const { username, password } = formState.data;

    const onSubmit = async (e) => {
        handleSubmit(e);
        if (Object.keys(errors).length) return;
        try {
            await auth.login(username, password);
            window.location = '/';
        } catch (err) {
            if (err.response && err.response.status === 400) {
                const errors = { ...formState.errors };
                errors.username = err.response.data;
                setErrors(errors);
            }
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                {renderInput('Username', 'username')}
                {renderInput('Password', 'password', 'password')}
                {renderButton('Login')}
            </form>
        </div>
    );
};
