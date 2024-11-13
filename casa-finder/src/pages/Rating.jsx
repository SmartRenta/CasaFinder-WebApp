import React, { useState } from "react";
import { List, Typography, Card, IconButton } from "@material-tailwind/react";
import {FaRegAngry, FaRegStar} from "react-icons/fa";

const Rating = ({ userRole }) => {
    return (
    <div>
        <Typography variant="h2" className="ml-4 mt-4 text-black text-xl">
            CALIFICACIÓN
        </Typography>
        
        <div className="flex justify-center align-center">
            <div className="bg-gray-300 overflow-y-auto px-16 py-8 my-4" style={{width:"50%"}}>
                {userRole === "TENANT" ?
                <div>
                    <Typography variant="h2" className="text-black text-xl my-4 text-center">
                        Califica al propietario
                    </Typography>
                    <div className="flex">
                        <div className="w-1/6 flex justify-end items-center pr-2">
                            <FaRegAngry className="cursor-pointer text-3xl"/>
                        </div>
                        <div className="w-5/6">
                            <div>
                                RAUL PEDRO SANTILLAN ILO
                            </div>
                            <div className="flex justify-start">
                                <FaRegStar className="fill-yellow-600"/>
                                <FaRegStar className="fill-yellow-600"/>
                                <FaRegStar className="fill-yellow-600"/>
                                <FaRegStar className="fill-yellow-600"/>
                                <FaRegStar className="fill-yellow-600"/>
                            </div>
                        </div>
                    </div>
                    <p className="bg-white p-3 mt-2 rounded-md shadow-md">
                    Excelente propietario. Siempre respetuoso y responde al instante.
                    </p>
                    <Typography variant="h2" className="text-black text-xl mt-8 mb-4 text-center">
                        Califica la propiedad
                    </Typography>
                    <div className="flex">
                        <div className="w-1/6 flex justify-end items-center pr-2">
                            <FaRegAngry className="cursor-pointer text-3xl"/>
                        </div>
                        <div className="w-5/6">
                            <div>
                                CONDOMINIO PRADERA
                            </div>
                            <div className="flex justify-start">
                                <FaRegStar className="fill-yellow-600"/>
                                <FaRegStar className="fill-yellow-600"/>
                                <FaRegStar className="fill-yellow-600"/>
                                <FaRegStar className="fill-yellow-600"/>
                                <FaRegStar className=""/>
                            </div>
                        </div>
                    </div>
                    <p className="bg-white p-3 mt-2 rounded-md shadow-md">
                    Fabulosa propiedad, pero mucho tráfico en horas punta.
                    </p>
                    <div className="mt-6 flex justify-around">
                        <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark">
                        Guardar
                        </button>
                    </div>
                </div>
                :
                <div>
                    <Typography variant="h2" className="text-black text-xl my-4 text-center">
                        Califica al inquilino
                    </Typography>
                    <div className="flex">
                        <div className="w-1/6 flex justify-end items-center pr-2">
                            <FaRegAngry className="cursor-pointer text-3xl"/>
                        </div>
                        <div className="w-5/6">
                            <div>
                                SOFIA LUCIA BARRUETA LOPEZ
                            </div>
                            <div className="flex justify-start">
                                <FaRegStar className="fill-yellow-600"/>
                                <FaRegStar className="fill-yellow-600"/>
                                <FaRegStar className="fill-yellow-600"/>
                                <FaRegStar className="fill-yellow-600"/>
                                <FaRegStar className=""/>
                            </div>
                        </div>
                    </div>
                    <p className="bg-white p-3 mt-2 rounded-md shadow-md">
                        Muy buen cliente. Siempre respetuoso, solo demora un poco en contestar. Dejó la propiedad en el mismo estado que fue entregado.
                    </p>
                    
                    <div className="mt-6 flex justify-around">
                        <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark">
                        Guardar
                        </button>
                    </div>
                </div>
                }
            </div>
        </div>
    </div>
    );
}

export default Rating;