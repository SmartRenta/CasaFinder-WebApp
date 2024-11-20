import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { List, Typography, Card, IconButton } from "@material-tailwind/react";
import ContractService from "../../../services/contractService";
import ContractContent from "../../../components/shared/Contracts/ContractContent";

const CreateContractStepFour = () => {

    const { id } = useParams(); 
    const [contract, setContract] = useState([]);
    useEffect(() => {
        const fetchContract = async () => {
            const dataContract = await ContractService.getContractById(id);
            setContract(dataContract);
        }
        fetchContract();
    }, []);

    return (
    <div>
        <Typography variant="h2" className="ml-4 my-4 text-black text-xl">
            CONTRATO {contract.accepted == null ? "PENDIENTE": contract.accepted == true ? "ACEPTADO" : "RECHAZADO" }
        </Typography>
        <div className="flex">
            <div className="w-1/5">
                <img
                    src={contract.accepted ? "/images/icono_contrato_aceptado.png"
                    : "/images/icono_contrato_rechazado.png"}
                    alt="Solicitud aceptada"
                    className="w-28 h-28"
                />
            </div>
            <div className="w-4/5">
                <small>15 de diciembre del 2024 a las 22:19 hrs</small>
                <Typography variant="h2" className="text-black text-xl">
                    {contract.accepted ? 
                    <div>Enhorabuena!!, <br></br>el arrendador ha aceptado el contrato</div>
                    :
                    <div>Lamentamos informarle que el arrendador ha rechazado el contrato</div>
                    }
                </Typography>
            </div>
        </div>
        <ContractContent contract={contract}/>
    </div>);
}

export default CreateContractStepFour;