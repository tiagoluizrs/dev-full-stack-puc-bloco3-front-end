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
            if (status === 401) {
                const responseData = await response.json();
                if (responseData.message === 'Token expirado') {
                    const response = await Api.post(`${URL}/reset-token`, { token });
                    const resetStatus = await response.status;
                    if (resetStatus === 200) {
                        const user = JSON.parse(localStorage.getItem('user'));
                        const data = await response.json();
                        user.token = data.token;
                        localStorage.setItem('user', JSON.stringify(user));
                        return true;
                    }
                }
                return false;
            }

            return status === 200;
        } catch (error) {
            return false;
        }
    },
    resetToken: async (token) => {
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
