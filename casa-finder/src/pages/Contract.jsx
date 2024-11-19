import React, { useState } from "react";
import { List, Typography, Card, IconButton } from "@material-tailwind/react";
import ContractContent from "../components/shared/Contracts/ContractContent";
import contractsJson from "../data/contracts.json"; 
import { getUserRoleFromCache, setUserRoleInCache } from "../utils/authUtils";
import { useParams, useNavigate } from "react-router-dom"; 

const Contract = () => {
    
    //ESTE ARCHIVO SE BORRARA
    const { id } = useParams(); 
    const userRole = getUserRoleFromCache();
    const contract = contractsJson.find(c => c.id == id)
    console.log("contract_id:"+id);
    console.table(contract);
    if (!contract) {
        return <div>No se encontró información relacionada.</div>;
      }

    const handleClick = () => {
        console.log("click");
    }

    return (
    <div>
        <Typography variant="h2" className="ml-4 my-4 text-black text-xl">
            CONTRATO {contract.estado === 1 ? "PENDIENTE" : (contract.estado === 2 ? "ACTIVO":(contract.estado === 3 ? "INACTIVO": ""))}
        </Typography>

        <div>
            {userRole === "TENANT" ?
            <div className="flex">
                <div className="w-1/5">
                    <img
                        src={"/images/icono_contrato_aceptado.png"}
                        alt="Solicitud aceptada"
                        className="w-28 h-28"
                    />
                </div>
                <div className="w-4/5">
                    <small>15 de diciembre del 2024 a las 22:19 hrs</small>
                    <Typography variant="h2" className="text-black text-xl">
                        Enhorabuena!!, <br></br>el arrendador ha aceptado el contrato
                    </Typography>
                </div>
            </div>
            : 
            ""
            }

            <ContractContent contract={contract}/>
            
            {userRole === "LANDLORD" && contract.estado === 1 ?
            <div className="mt-6 flex justify-around">
                <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark">
                Aceptar
                </button>

                <button
                className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400"
                >
                Rechazar
                </button>
            </div>
            : ""
            }
            
        </div>

    </div>
    );
}

export default Contract;