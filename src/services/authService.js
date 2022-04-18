import http from './httpService';
import jwtDecode from 'jwt-decode';

const endPoint = 'http://localhost:3000/api/auth';
const tokenKey = 'token';

http.setJwt(getJwt());

export const login = async (email, password) => {
    const { data: jwt } = await http.post(endPoint, { email, password });
    localStorage.setItem(tokenKey, jwt);
};

export const loginWithJwt = (jwt) => {
    localStorage.setItem('token', jwt);
};

export const logout = async () => {
    localStorage.removeItem(tokenKey);
};

export const getCurrentUser = () => {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (error) {
        return null;
    }
};

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    logout,
    getCurrentUser,
    loginWithJwt,
    getJwt
};
