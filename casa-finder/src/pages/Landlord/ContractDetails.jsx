import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { List, Typography, Card, IconButton } from "@material-tailwind/react";
import {FaRegAngry, FaRegStar} from "react-icons/fa";
import ContractService from "../../services/contractService";
import PropertyService from "../../services/propertyService";
import ContractContent from "../../components/shared/Contracts/ContractContent";
import ContractDownload from "../../components/shared/Contracts/ContractDownload";

const ContractDetails = () => {
    
    const { id } = useParams(); 
    
    const [contract, setContract] = useState([]);
    useEffect(() => {
        const fetchContract = async () => {
            const dataContract = await ContractService.getContractById(id);
            setContract(dataContract);
        }
        fetchContract();
    }, []);

    const handleClick = () => {
        console.log("click");
    }

    return (
    <div>
        <Typography variant="h2" className="ml-4 my-4 text-black text-xl">
            CONTRATO {!contract.isActive ? "PENDIENTE" : "EXISTENTE"}
        </Typography>
        <div>
            
            <ContractDownload/>
            <div className="flex">
                <div className="w-1/6 flex justify-end">
                    <FaRegAngry className="cursor-pointer text-3xl" onClick={handleClick}/>
                </div>
                <div className="w-5/6">
                    {contract?.property?.title}  ⭐5
                </div>
            </div>
            <ContractContent contract={contract}/>
            { !contract.isActive && 
            <div className="mt-6 flex justify-around">
                <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark">
                Aceptar
                </button>

                <button className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400">
                Rechazar
                </button>
            </div>}
        </div>
    </div>);
}

export default ContractDetails;