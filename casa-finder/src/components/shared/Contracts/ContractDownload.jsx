import React, { useState } from "react";
import {FaFilePdf} from "react-icons/fa";

const ContractDownload = () => {

    const handleClick = () => {
        console.log("click");
    }

    return (
        <div className="flex">
            <div className="w-5/6 text-right mr-4">
                <p>Puede descargar el contrato en formato pdf</p>
            </div>
            <div className="w-1/6 text-right">
                <FaFilePdf className="text-red-500 cursor-pointer text-3xl" onClick={handleClick}/>
            </div>
        </div>
    );
}

export default ContractDownload;