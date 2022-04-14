import { useState } from 'react';
import { Input } from './commons/input';
import Joi from 'joi-browser';

export const LoginForm = () => {
    // TODO: create hook useForm
    // TODO: cambiar a Formik
    const [state, setState] = useState({
        account: {
            username: '',
            password: ''
        },
        errors: {}
    });

    const { username, password } = state.account;
    const { errors } = state;

    const schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    };

    const validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(state.account, schema, options);
        console.log(error.details);
        if (!error) return null;

        const errors = {};
        for (const item of error.details) errors[item.path[0]] = item.message;

        return errors;
    };

    const validateProperty = ({ name, value }) => {
        if (name === 'username') if (value.trim() === '') return 'Username is required';
        if (name === 'password') if (value.trim() === '') return 'Password is required';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validate();
        setState({
            ...state,
            errors
        });
    };

    const handleChange = ({ target }) => {
        const errors = state.errors;

        const errorMessage = validateProperty(target);
        if (errorMessage) errors[target.name] = errorMessage;
        else delete errors[target.name];

        setState({
            ...state,
            account: {
                ...state.account,
                [target.name]: target.value,
                errors
            }
        });
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    name='username'
                    error={errors.username}
                    label='Username'
                    onChange={handleChange}
                    value={username}
                />
                <Input
                    name='password'
                    error={errors.password}
                    label='Password'
                    onChange={handleChange}
                    value={password}
                />
                <button type='submit' className='btn btn-primary'>
                    Login
                </button>
            </form>
        </div>
    );
};
