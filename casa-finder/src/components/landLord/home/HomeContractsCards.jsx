import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@material-tailwind/react";
import { getUserRoleFromCache } from "../../../utils/authUtils";

const HomeContractCard = ({ contract }) => {
    const navigate = useNavigate();
    const userRole = getUserRoleFromCache();

    const handleMouseEnter = (e) => {
        e.currentTarget.style.background = '#F1F5F9'; // Color más claro al hover
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
        <Card 
            className="flex flex-col w-64 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white"
            onClick={() => handleClick(contract)} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >
            <div className="w-full">
                <img 
                    className="w-full h-58 object-cover rounded-t-lg" 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/640px-PDF_file_icon.svg.png" 
                    alt="PDF"
                />
            </div>
            <div className="flex-1 p-3">
                <h3 className="text-sm font-medium">{contract?.property?.title}</h3>
                <p className="text-gray-700 text-sm mt-1">{contract?.tenant.name} {contract?.tenant?.lastName}</p>
                <p className="text-gray-500 text-xs">{new Date(contract.creationDate).toLocaleString('es-ES')}</p>
            </div>
        </Card>
    );
};

export default HomeContractCard;
