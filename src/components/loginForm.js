import Joi from 'joi-browser';
import { useForm } from '../hooks/useForm';

export const LoginForm = () => {
    const schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    };

    const { formState, handleSubmit, renderInput, renderButton } = useForm({
        data: {
            username: '',
            password: ''
        },
        errors: {},
        schema
    });

    const { errors } = formState;

    const onSubmit = (e) => {
        handleSubmit(e);
        if (Object.keys(errors).length) return;
        console.log('Submitted');
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
