import { Input } from '../components/commons/input';
import { useCallback, useState } from 'react';
import Joi from 'joi-browser';
import { Select } from '../components/commons/select';

export const useForm = (initialState) => {
    const [formState, setFormState] = useState(initialState);
    const { data, errors, schema } = formState;

    const validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(data, schema, options);
        if (!error) return null;

        const errors = {};
        for (const item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };

    const validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const propertySchema = { [name]: schema[name] };
        const { error } = Joi.validate(obj, propertySchema);
        return error ? error.details[0].message : null;
    };

    const handleChange = ({ target }) => {
        const errors = { ...formState.errors };

        const errorMessage = validateProperty(target);
        if (errorMessage) errors[target.name] = errorMessage;
        else delete errors[target.name];

        setFormState({
            ...formState,
            data: {
                ...formState.data,
                [target.name]: target.value
            },
            errors
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        if (errors) return;

        setFormState({
            ...formState,
            errors: errors || {}
        });
    };

    const renderInput = (label, name, type = 'text') => {
        return (
            <Input
                type={type}
                name={name}
                error={errors[name]}
                label={label}
                onChange={handleChange}
                value={data[name]}
            />
        );
    };

    const setData = useCallback((data) => {
        setFormState((formsState) => ({
            ...formState,
            data
        }));
    }, []);

    const setErrors = (errors) => {
        setFormState({
            ...formState,
            errors
        });
    };

    const renderButton = (label) => {
        return (
            <button disabled={validate()} type='submit' className='btn btn-primary'>
                {label}
            </button>
        );
    };

    const renderSelect = (label, name, options) => {
        return (
            <Select
                label={label}
                name={name}
                options={options}
                error={errors[name]}
                onChange={handleChange}
                value={data[name]}
            />
        );
    };

    return {
        formState,
        handleSubmit,
        renderButton,
        renderInput,
        renderSelect,
        setData,
        setErrors,
        errors
        // handleChange,
        // validate,
        // validateProperty,
    };
};
