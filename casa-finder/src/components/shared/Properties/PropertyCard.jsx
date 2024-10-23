import React from "react";

const PropertyCard = ({ title, price, floors, type, parking, rooms, bathrooms, images, onRentClick }) => {
  const getPlural = (number, singular, plural) => {
    return number === 1 ? singular : plural;
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-100 flex flex-col justify-between w-full">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <img
        src={images[0]}  // Usamos la primera imagen del array
        alt={title}
        className="w-full h-40 object-cover rounded-lg mt-2"
      />
      <p className="text-gray-700 mt-2 font-semibold">S/ {price.toLocaleString()}</p>
      <p className="text-gray-600">{floors} {getPlural(floors, 'Piso', 'Pisos')}</p>
      <p className="text-gray-600">Tipo: {type}</p>
      <p className="text-gray-600">
        Estacionamiento: {parking} {getPlural(parking, 'Vehículo', 'Vehículos')}
      </p>
      <p className="text-gray-600">
        Cuartos: {rooms} {getPlural(rooms, 'Cuarto', 'Cuartos')}
      </p>
      <p className="text-gray-600">
        Baños: {bathrooms} {getPlural(bathrooms, 'Baño', 'Baños')}
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
