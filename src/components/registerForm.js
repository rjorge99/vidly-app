import { useForm } from '../hooks/useForm';
import Joi from 'joi-browser';
import { register } from '../services/userService';
import { loginWithJwt } from '../services/authService';

export const RegisterForm = () => {
    const schema = {
        username: Joi.string().required().email().label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Name')
    };

    // TODO: no deberia mandar errores yo
    const { renderInput, renderButton, handleSubmit, setErrors, formState } = useForm({
        data: {
            username: '',
            password: '',
            name: ''
        },
        errors: {},
        schema
    });

    const { errors, data } = formState;

    // TODO: Evitar esta llamada, buscar hacerlo como Formik
    const onSubmit = async (e) => {
        handleSubmit(e);
        if (Object.keys(errors).length) return;
        try {
            const response = await register(data);
            loginWithJwt(response.headers['x-auth-token']);
            window.location = '/'; // TODO: cambiar despues
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
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                {renderInput('Username', 'username')}
                {renderInput('Password', 'password', 'password')}
                {renderInput('Name', 'name')}
                {renderButton('Register')}
            </form>
        </div>
    );
};
