import React, { useState, useRef } from "react";
import { List, Typography, Card, IconButton } from "@material-tailwind/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {FaFilePdf, FaRegAngry} from "react-icons/fa";
import { getUserRoleFromCache } from "../../../utils/authUtils";

const ContractContent = ({contract}) => {

    const divRef = useRef();
    const userRole = getUserRoleFromCache();

    const startDate = new Date(contract?.startDate);
    const endDate = new Date(contract?.endDate);

    const handlePdfDownload = async () => {
        
        const element = divRef.current;
        const originalStyle = element.style.cssText;
        element.style.overflow = "visible";
        element.style.height = "auto";
        const canvas = await html2canvas(element);
        element.style.cssText = originalStyle;
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("solicitud_de_contrato_"+contract?.tenant?.name+"_"+contract?.tenant?.lastName+".pdf");
    }

    const handleRedirectProfile = () => {
        console.log("redirigir");
    }

    return (
        <div>
            <div className="flex">
                <div className="w-5/6 text-right mr-4">
                    <p>Puede descargar el contrato en formato pdf</p>
                </div>
                <div className="w-1/6 text-right">
                    <FaFilePdf className="text-red-500 cursor-pointer text-3xl" onClick={handlePdfDownload}/>
                </div>
            </div>
            <div className="" onClick={handleRedirectProfile}>
                {   userRole === "LANDLORD" ? 
                    <span>Solicitante: {contract?.tenant?.name} {contract?.tenant?.lastName}⭐5</span>
                    : 
                    <span>Inquilino: {contract?.landlord?.name} {contract?.landlord?.lastName}⭐4</span>
                }
            </div>
            <div ref={divRef} className=" bg-gray-300 overflow-y-auto px-16 py-8 my-4">
                <Typography variant="h2" className="text-black text-xl my-4 text-center">
                    CONTRATO DIGITAL {contract.status}
                </Typography>
                <div className="border-t-2 py-4 border-black">
                    <p>Yo, {contract?.tenant?.name} {contract?.tenant?.lastName} identificado con {contract?.tenant?.documentType} {contract?.tenant?.documentNumber} con número de teléfono {contract?.tenant?.phone} y con domicilio en {contract?.address}, {contract?.country}, de ahora en adelante llamado EL ARRENDATARIO, 
                        por la presente declaro mi intención de alquilar la propiedad de {contract?.landlord?.name} {contract?.landlord?.lastName} identificado con {contract?.landlord?.documentType} {contract?.landlord?.documentNumber} con número de teléfono {contract?.landlord?.phone}, de ahora en adelante llamado EL ARRENDADOR, 
                        desde el {startDate.toLocaleString('es-ES')} hasta el {endDate.toLocaleString('es-ES')}. </p>
                </div>
                <div className="border-t-2 py-4 border-black">
                    <strong>1. Pago frecuente</strong><br></br>
                    <p>Yo, EL ARRENDATARIO, doy fe del pago bajo el monto acordado de {contract?.property?.currency} {contract?.property?.price} con una frecuencia de pago {contract?.frequency}.</p>
                </div> 
                <div className="border-t-2 py-4 border-black">
                    <strong>2. Servicios incluidos</strong><br></br>
                    <p>Se incluyen los siguientes servicios:</p>
                    <ul>
                    {
                        contract?.property?.includes.map( (value, index) => (
                            <li key={index}>▪ {value}</li>
                        ))
                    }
                    </ul>
                    <br></br>
                    <p>Las ventajas con las que cuenta son:</p>
                    <ul>
                    {
                        contract?.property?.features.map((value, index) => (
                            <li key={index}>▪ {value}</li>
                        ))
                    }
                    </ul>
                </div>
                <div className="border-t-2 py-4 border-black">
                    <strong>3. Estándares de seguridad</strong><br></br>
                    <p>
                    EL ARRENDATARIO está obligado a permitir la inspección del bien arrendado por parte del ARRENDADOR, 
                    para cuyo efecto éste deberá cursar previo aviso por escrito, con una anticipación no menor de dos días. Queda convenido que forma parte de la inspección del bien arrendado, la exhibición de los recibos debidamente cancelados correspondientes a los servicios y tributos que se refiere la cláusula novena.
                    EL ARRENDATARIO está obligado a efectuar por cuenta y costo propio las reparaciones y mantenimientos que sean necesarios para conservar el bien en el mismo estado en que fue recibido.
                    EL ARRENDATARIO se obliga a desocupar el bien arrendado en la fecha de vencimiento del plazo estipulado en la cláusula sexta de este contrato, salvo renovación del mismo.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ContractContent;