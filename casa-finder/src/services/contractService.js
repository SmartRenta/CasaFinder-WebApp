import axiosInstance from "../utils/axiosConfig.js";
import { getTokenFromCache } from "../utils/authUtils.js";

const ContractService = {

    createContract: async (propertyData) => {
        try {
            const token = getTokenFromCache();
            propertyData.expirationDate =  `${propertyData.expirationDate}-01`;
            const response = await axiosInstance.post('/api/v1/contracts/', propertyData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error al crear un contrato:", error);
            return null;
        }
    },

    getContractById: async(id) => { 
        try{
            const token = getTokenFromCache();
            const response = await axiosInstance.get(`/api/v1/contracts/${id}`, {
                headers: { Authorization: `Bearer ${token}`}
            });
            return response.data;
        }catch(error){
            console.error("Error al obtener el contrato con id "+id+": ", error);
        }
    },

    setContractResponseById: async(id, accepted) => {
        try{
            const token = getTokenFromCache();
            const response = await axiosInstance.post(`/api/v1/contracts/${id}/response`, accepted, {
                headers: { Authorization: `Bearer ${token}`}
            });
            return response.data;
        }catch(error){
            console.error("Error al cambiar el estado del contrato "+id+": ", error);
        }
    },
    getAllContractsById: async(userId) => {
        try{
            const token = getTokenFromCache();
            const response = await axiosInstance.get(`/api/v1/users/${userId}/contracts`, {
                headers: { Authorization: `Bearer ${token}`}
            });
            return response.data;
        }catch(error){
            console.error("Error al obtener contratos del usuario "+userId+": ", error);
        }
    },

    getAllContractsByTenantId: async(tenantId) => {
        try{
            const token = getTokenFromCache();
            const response = await axiosInstance.get(`/api/v1/tenants/${tenantId}/contracts`, {
                headers: { Authorization: `Bearer ${token}`}
            });
            return response.data;
        }catch(error){
            console.error("Error al obtener contratos del usuario "+tenantId+": ", error);
        }
    },

    updateContract: async (id, contractData) => {
        try {
            const token = getTokenFromCache();
            const response = await axiosInstance.put(`/api/v1/contracts/${id}`, contractData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar el contrato con id ${id}:`, error);
            return null;
        }
    }

};

export default ContractService;
