import http from './httpService';

const endPoint = 'http://localhost:3000/api/users';

export const register = async (user) => {
    return await http.post(`${endPoint}`, {
        email: user.username,
        name: user.name,
        password: user.password
    });
};
