import axiosInstance from "../utils/axiosConfig.js";
import {getTokenFromCache} from "../utils/authUtils.js";

export const getUserData = async () => {
    try {
        const token = getTokenFromCache();
        const response = await axiosInstance.get('/api/v1/users/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const updateUserData = async (userData) => {
    try {
        console.log(userData);
        const token = getTokenFromCache();
        const response = await axiosInstance.put('/api/v1/users/', userData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}