import axiosInstance from "../utils/axiosConfig.js";
import { getTokenFromCache } from "../utils/authUtils.js";

const PropertyService = {
    
    getAllProperties: async () => {
        try {
            const token = getTokenFromCache();
            const response = await axiosInstance.get('/api/v1/properties/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener todas las propiedades:", error);
            return null;
        }
    },

    getPropertyById: async (id) => {
        try {
            const token = getTokenFromCache();
            const response = await axiosInstance.get(`/api/v1/properties/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error al obtener la propiedad con ID ${id}:`, error);
            return null;
        }
    },

    createProperty: async (propertyData) => {
        try {
            const token = getTokenFromCache();
            const response = await axiosInstance.post('/api/v1/properties/', propertyData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error al crear una propiedad:", error);
            return null;
        }
    },

    
    updateProperty: async (id, propertyData) => {
        try {
            const token = getTokenFromCache();
            const response = await axiosInstance.put(`/api/v1/properties/${id}`, propertyData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar la propiedad con ID ${id}:`, error);
            return null;
        }
    },

    deleteProperty: async (id) => {
        try {
            const token = getTokenFromCache();
            await axiosInstance.delete(`/api/v1/properties/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return true;
        } catch (error) {
            console.error(`Error al eliminar la propiedad con ID ${id}:`, error);
            return false;
        }
    },

    findPropertiesByLocation: async (region, province, district) => {
        try {
            const token = getTokenFromCache();
            const response = await axiosInstance.get('/api/v1/properties/search', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: { region, province, district }
            });
            return response.data;
        } catch (error) {
            console.error("Error al buscar propiedades por ubicación:", error);
            return null;
        }
    },

    getPropertiesByLandlord: async (landlordId) => {
        try {
            const token = getTokenFromCache();
            const response = await axiosInstance.get(`/api/v1/properties/landlord/${landlordId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error al obtener propiedades para el landlord con ID ${landlordId}:`, error);
            return [];
        }
    },

};

export default PropertyService;
