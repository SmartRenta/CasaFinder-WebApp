import React from "react";
import PropertyCard from "../../shared/Properties/PropertyCard";
import propertiesData from "../../../data/propertiesData.json";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para la navegación

const Results = () => {
  const hasResults = propertiesData.length > 0;
  const navigate = useNavigate(); // Hook de React Router para navegar entre rutas

  const handleViewProperty = (property) => {
    navigate(`/property/${property.id}`); // Navegamos a la página de detalles de la propiedad
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {hasResults ? (
        propertiesData.map((property) => (
          <PropertyCard
            key={property.id}
            title={property.title}
            price={property.price}
            floors={property.floors}
            type={property.type}
            parking={property.parking}
            rooms={property.rooms}
            bathrooms={property.bathrooms}  // Añadimos el campo de baños
            images={property.images} // Pasamos las imágenes al componente
            onRentClick={() => handleViewProperty(property)} // Cambiamos el evento al hacer clic
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-100 rounded-lg">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6717/6717248.png"
            alt="No results"
            className="w-32 h-32 mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800">
            No se encontraron resultados
          </h2>
          <p className="text-gray-600">Prueba con otros filtros</p>
        </div>
      )}
    </div>
  );
};

export default Results;
