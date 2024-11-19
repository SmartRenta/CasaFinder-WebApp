import axiosInstance from "../utils/axiosConfig.js";
import { getTokenFromCache } from "../utils/authUtils.js";

const notificationService = {

    getAllNotifications: async(id) => {
        try{
            const token = getTokenFromCache();
            const response = await axiosInstance.get(`/api/v1/users/${id}/notifications`, {
                headers: { Authorization: `Bearer ${token}`}
            });
            return response.data;
        }catch(error){
            console.error("Error al obtener las notificaciones: ",error);
            return null;
        }
    },

    markAsRead: async(id) => {
        
        try{
            const token = getTokenFromCache();
            const response = await axiosInstance.post(`/api/v1/notifications/${id}/read`, null, {
                headers: { Authorization: `Bearer ${token}`}
            });
            return response.data;
        }catch(error){
            console.error("Error al marcar la notificación como leída: ", error);
        }
    }
}

export default notificationService;
