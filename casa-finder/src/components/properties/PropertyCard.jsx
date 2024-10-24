import {FaEdit} from "react-icons/fa";
import {useState} from 'react';
import PropertyEditModal from "./PropertyEditModal.jsx";

const PropertyCard = ({property}) => {
    const [showModal, setShowModal] = useState(false);

    const handleEditClick = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <div className="flex border rounded-lg shadow-lg p-4">
            <div className="w-1/3">
                <img className="w-full h-32 object-cover rounded" src={property.image} alt={property.name}/>
                <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded">Ver más fotos</button>
            </div>
            <div className="w-2/3 pl-4 flex flex-col justify-items-start">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="font-bold text-xl">{property.name}</div>
                        <div className="text-gray-700 text-base">{property.price}</div>
                    </div>
                    <FaEdit className="text-gray-500 cursor-pointer text-3xl" onClick={handleEditClick}/>
                </div>
                <div className="mt-2">
                    <p className="text-gray-700">Pisos: {property.floors} {property.floors > 1 ? " Pisos" : " Piso"}</p>
                    <p className="text-gray-700">Tipo: {property.type}</p>
                    <p className="text-gray-700">Estacionamientos: {property.parking} {property.parking > 1 ? "estacionamientos" : "estacionamiento"}</p>
                    <p className="text-gray-700">Cuartos: {property.rooms} {property.rooms > 1 ? "Cuartos" : "Cuarto"}</p>
                </div>
            </div>
            {showModal && <PropertyEditModal property={property} onClose={handleCloseModal}/>}
        </div>
    );
};

export default PropertyCard;
