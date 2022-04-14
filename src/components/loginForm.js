import { useState } from 'react';
import { Input } from './commons/input';
import Joi from 'joi-browser';
import { useForm } from '../hooks/useForm';

export const LoginForm = () => {
    const schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    };

    const { formState, handleSubmit, handleChange, validate } = useForm({
        data: {
            username: '',
            password: ''
        },
        errors: {},
        schema
    });

    const { username, password } = formState.data;
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
                <button disabled={validate()} type='submit' className='btn btn-primary'>
                    Login
                </button>
            </form>
        </div>
    );
};
