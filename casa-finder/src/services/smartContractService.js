import axiosInstance from "../utils/axiosConfig.js";
import { getTokenFromCache } from "../utils/authUtils.js";

const SmartContractService = {
    getAllSmartContracts: async () => {
        try {
            const token = getTokenFromCache();
            const response = await axiosInstance.get("/api/v1/smart-contracts/", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener todos los Smart Contracts:", error);
            return null;
        }
    },

    getSmartContractById: async (id) => {
        try {
            const token = getTokenFromCache();
            const response = await axiosInstance.get(`/api/v1/smart-contracts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error al obtener el Smart Contract con id ${id}:`, error);
            return null;
        }
    },

    createSmartContract: async (smartContractData) => {
        try {
            const token = getTokenFromCache();
            const response = await axiosInstance.post("/api/v1/smart-contracts/", smartContractData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error al crear un Smart Contract:", error);
            return null;
        }
    },

    updateSmartContract: async (id, smartContractData) => {
        try {
            const token = getTokenFromCache();
            const response = await axiosInstance.put(`/api/v1/smart-contracts/${id}`, smartContractData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar el Smart Contract con id ${id}:`, error);
            return null;
        }
    },

    deleteSmartContract: async (id) => {
        try {
            const token = getTokenFromCache();
            await axiosInstance.delete(`/api/v1/smart-contracts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return true;
        } catch (error) {
            console.error(`Error al eliminar el Smart Contract con id ${id}:`, error);
            return false;
        }
    }
};

export default SmartContractService;
