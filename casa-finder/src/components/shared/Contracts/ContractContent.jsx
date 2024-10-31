import React, { useState } from "react";
import { List, Typography, Card, IconButton } from "@material-tailwind/react";

const ContractContent = ({contract}) => {

    console.log("holi2");
    console.table(contract);
    const handleClick = () => {
        console.log("click");
    }

    return (
        <div className="h-96 bg-gray-300 overflow-y-auto px-16 py-8 my-4">
            <Typography variant="h2" className="text-black text-xl my-4 text-center">
                CONTRATO DIGITAL
            </Typography>
            <div className="border-t-2 py-4 border-black">
                <p>Yo, {contract.name} identificada con DNI 12345678 con número de celular 987654321 y con domicilio en Av. La paz 456, Lima, Perú, de ahora en adelante llamada LA ARRENDATARIA, por la presente declaro mi intención de alquilar la propiedad de RAUL PEDRO SANTILLAN ILO identificado con DNI 1234569 con número de celular 987654312  y domicilio en Jr. Nueva Yoirk 789, de ahora en adelante llamado EL ARRENDADOR, desde el 01/12/2024 hasta el 01/12/2027. </p>
            </div>
            <div className="border-t-2 py-4 border-black">
                <strong>1. Débito automático</strong><br></br>
                <p>Yo, LA ARRENDATARIA, autorizo el débito automático a la tarjeta de crédito XXXXXXXXX890 a mi mismo nombre bajo el monto acordado de S/ 25,500.00 con una frecuencia de pago bimestral y además, la retención de los 4 meses de garantía solicitados.</p>
            </div> 
            <div className="border-t-2 py-4 border-black">
                <strong>2. Servicios incluidos</strong><br></br>
                <p>Se incluyen los siguientes servicios: a, b, c, d</p>
            </div>
        </div>
    );
}

export default ContractContent;