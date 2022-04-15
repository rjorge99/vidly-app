import { useForm } from '../hooks/useForm';
import Joi from 'joi-browser';

export const RegisterForm = () => {
    const schema = {
        username: Joi.string().required().email().label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Name')
    };

    // TODO: no deberia mandar errores yo
    const { renderInput, renderButton, handleSubmit, formState } = useForm({
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
    const onSubmit = (e) => {
        handleSubmit(e);
        if (Object.keys(errors).length) return;
        console.log(data);
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
