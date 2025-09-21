import Api from './Api';

const URL = process.env.REACT_APP_AUTH_URL + '/auth';

const Auth = {
    login: async (data) => {
        const response = await Api.post(`${URL}/login`, data);
        return await response.json();
    },

    register: async (data) => {
        const response = await Api.post(`${URL}/register`, data);
        return await response.json();
    },
    tokenIsValid: async (token) => {
        const response = await Api.post(`${URL}/validate-token`, { token });
        try {
            const status = await response.status;
            return status === 200;
        } catch (error) {
            return false;
        }
    }
};

export default Auth;
