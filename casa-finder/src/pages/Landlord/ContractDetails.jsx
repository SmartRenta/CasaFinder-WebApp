import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { List, Typography, Card, IconButton } from "@material-tailwind/react";
import {FaRegAngry, FaRegStar} from "react-icons/fa";
import ContractService from "../../services/contractService";
import PropertyService from "../../services/propertyService";
import ContractContent from "../../components/shared/Contracts/ContractContent";

const ContractDetails = () => {
    
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [contract, setContract] = useState([]);
    useEffect(() => {
        const fetchContract = async () => {
            const dataContract = await ContractService.getContractById(id);
            setContract(dataContract);
        }
        fetchContract();
    }, []);

    /*const hoy = new Date();
    hoy.setHours(0,0,0,0);
    const startDate = new Date(`${contract?.startDate}T00:00:00-05:00`);
    const endDate = new Date(`${contract?.endDate}T00:00:00-05:00`);
    
    const [estado, setEstado] = useState([]);
    const estadoContrato = contract.accepted == null && (hoy < startDate) ? "PENDIENTE" : (
        contract.accepted == null && (hoy >= startDate) ? "VENCIDO" : (
        contract.accepted == true && (hoy < endDate) ? "ACTIVO" : (
        contract.accepted == true && (hoy >= endDate) ? "INACTIVO" : "RECHAZADO")));
    useEffect(() => {
        setEstado(estadoContrato);
    }, []);*/

    const handleContractResponse = async (accepted) => {
        const done =  await ContractService.setContractResponseById(id, accepted); 
        console.log("done: "+done);    
        if(done)   {
            contract.accepted = accepted;
            if(accepted){
                //BLOCKCHAIN
                console.log("blockchain");
            }
            navigate("/landlord/contratos");
        }
    }

    return (
    <div>
        <Typography variant="h2" className="ml-4 my-4 text-black text-xl">
            CONTRATO {contract.status}
        </Typography>
        <div>
            <ContractContent contract={contract}/>
            { contract.accepted == null && //estado === "PENDIENTE" && 
            <div className="mt-6 flex justify-around">
                <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark" onClick={() => handleContractResponse(true)}>
                Aceptar
                </button>

                <button className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400" onClick={() => handleContractResponse(false)}>
                Rechazar
                </button>
            </div>}
        </div>
    </div>);
}

export default ContractDetails;