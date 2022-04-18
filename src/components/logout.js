import auth from '../services/authService';
import { useEffect } from 'react';

export const Logout = () => {
    useEffect(() => {
        auth.logout();
        window.location = '/';
    }, []);

    return null;
};
