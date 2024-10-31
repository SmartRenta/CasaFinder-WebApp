import React from "react";
import PropertyCard from "../../shared/Properties/PropertyCard";
import propertiesData from "../../../data/propertiesData.json";
import { useNavigate } from "react-router-dom";
import { Property } from "../../../entities/Property"; // Asegúrate de importar la clase Property

const Results = () => {
  const hasResults = propertiesData.length > 0;
  const navigate = useNavigate();

  const handleViewProperty = (property) => {
    navigate(`/tenant/property/${property.id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {hasResults ? (
        propertiesData.map((propertyData) => {
          // Instanciamos la clase Property con los datos del JSON
          const property = new Property(
            propertyData.id,
            propertyData.title,
            propertyData.price,
            propertyData.floors,
            propertyData.type,
            propertyData.parking,
            propertyData.rooms,
            propertyData.bathrooms,
            propertyData.description,
            propertyData.features,
            propertyData.included, // Asegúrate de corregir "included" si es diferente en el JSON
            propertyData.images,
            propertyData.contact,
            propertyData.region,
            propertyData.province,
            propertyData.district
          );

          return (
            <PropertyCard
  key={property.id}
  property={property} // Pasamos la instancia completa de Property
  onRentClick={() => handleViewProperty(property)}
/>
          );
        })
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
