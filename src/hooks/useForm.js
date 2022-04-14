import React, { useState } from 'react';
import Joi from 'joi-browser';

export const useForm = (initialState = { data: {}, errors: {}, schema: {} }) => {
    const [formState, setFormState] = useState(initialState);
    const { schema, errors, data } = formState;

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
        setFormState({
            ...formState,
            errors: errors || {}
        });
    };

    return {
        formState,
        validate,
        validateProperty,
        handleChange,
        handleSubmit,
        errors
    };
};
