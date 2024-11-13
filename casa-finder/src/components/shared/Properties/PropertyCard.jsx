import React from "react";

const PropertyCard = ({ property, onRentClick }) => {
    const getPlural = (number, singular, plural) => {
        return number === 1 ? singular : plural;
    };

    return (
        <div className="border rounded-lg p-4 bg-gray-100 flex flex-col justify-between w-full">
            <h2 className="text-xl font-bold text-gray-800">{property.title}</h2>
            <img
                src={property.images[0]}  
                alt={property.title}
                className="w-full h-40 object-cover rounded-lg mt-2"
            />
            <p className="text-gray-700 mt-2 font-semibold">
                {property.currency} {property.price}
            </p>
            <p className="text-gray-600">
                {property.floors} {getPlural(property.floors, 'Piso', 'Pisos')}
            </p>
            <p className="text-gray-600">Tipo: {property.type}</p>
            <p className="text-gray-600">
                Estacionamiento: {property.parking} {getPlural(property.parking, 'Vehículo', 'Vehículos')}
            </p>
            <p className="text-gray-600">
                Cuartos: {property.rooms} {getPlural(property.rooms, 'Cuarto', 'Cuartos')}
            </p>
            <p className="text-gray-600">
                Baños: {property.bathrooms} {getPlural(property.bathrooms, 'Baño', 'Baños')}
            </p>
            <button
                className="bg-primary text-white py-2 rounded-md mt-4 hover:bg-primary-dark"
                onClick={onRentClick}
            >
                Ver Propiedad
            </button>
        </div>
    );
};

export default PropertyCard;
