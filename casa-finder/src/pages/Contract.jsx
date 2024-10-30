import React, { useState } from "react";
import { List, Typography, Card, IconButton } from "@material-tailwind/react";
import ContractDownload from "../components/shared/Contracts/ContractDownload";
import ContractContent from "../components/shared/Contracts/ContractContent";
import {FaRegAngry, FaRegStar} from "react-icons/fa";

const Contract = ({ userRole }) => {
    
    const handleClick = () => {
        console.log("click");
    }

    return (
    <div>
        <Typography variant="h2" className="ml-4 my-4 text-black text-xl">
            CONTRATO
        </Typography>

        <div>
            {userRole === "tenant" ?
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
            <ContractDownload/>
            {userRole === "tenant" ?
            ""
            : 
            <div className="flex">
                    <div className="w-1/6 flex justify-end">
                        <FaRegAngry className="cursor-pointer text-3xl" onClick={handleClick}/>
                    </div>
                    <div className="w-5/6">
                        SOFIA LUCIA BARRUETA LOPEZ ⭐ 5
                    </div>
            </div>
            }
            <ContractContent/>
            
            {userRole === "tenant" ?
            ""
            : 
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
            }
            
        </div>

    </div>
    );
}

export default Contract;