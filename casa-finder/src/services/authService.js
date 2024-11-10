import axiosInstance from "../utils/axiosConfig.js";

export const login = async (email, password) => {
    try {
        console.log({email, password});
        const response = await axiosInstance.post('/api/v1/auth/login', {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const register = async ({user}) => {
    try {
        const response = await axiosInstance.post('/api/v1/auth/register',
            user
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}