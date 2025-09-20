import Api from './Api';

const URL = process.env.REACT_APP_AUTH_URL + '/auth';

const Auth = {
    login: async (data) => {
        return await Api.post(`${URL}/login`, data);
    },

    register: async (data) => {
        return await Api.post(`${URL}/register`, data);
    },
};

export default Auth;
