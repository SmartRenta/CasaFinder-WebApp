import React from "react";
import { useNavigate } from "react-router-dom";
import {Card} from "@material-tailwind/react";
import { getUserRoleFromCache } from "../../../utils/authUtils";

const HomeContractCard = ({contract}) => {
    
    const navigate = useNavigate();
    const userRole = getUserRoleFromCache();

    const handleMouseEnter = (e) => {
        e.currentTarget.style.background = '#D3D3D3';
        e.currentTarget.style.cursor = 'pointer';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.background = 'white';
    };

    const handleClick = (contract) => {
        const basePath = userRole === "TENANT" ? "/tenant" : "/landlord";
        navigate(`${basePath}/contratos/${contract.id}`);
    };

    return (
        <Card className="flex flex-col w-80 max-w-md"
                        onClick={() => handleClick(contract)} 
                        onMouseEnter={handleMouseEnter} 
                        onMouseLeave={handleMouseLeave}>
            <div className="w-full">
                <img className="w-full h-80 object-fill rounded" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/640px-PDF_file_icon.svg.png" alt="PDF"/>
            </div>
            <div className="flex-1 p-4">
                <h3 className="text-lg font-medium">{contract.property.title}</h3>
                <p className="text-gray-700 mt-2">{contract.name}</p>
                <p className="text-gray-500">{contract.date}</p>
                <div className="mt-4">
                </div>
            </div>
        </Card>
    );
};

export default HomeContractCard;