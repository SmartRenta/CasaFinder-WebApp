import axiosInstance from "../utils/axiosConfig.js";
import { getTokenFromCache } from "../utils/authUtils.js";

const ContractService = {

    createContract: async (propertyData) => {
        try {
            debugger
            const token = getTokenFromCache();
            const response = await axiosInstance.post('/api/v1/contracts/', propertyData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error al crear una contrato:", error);
            return null;
        }
    },

};

export default ContractService;
