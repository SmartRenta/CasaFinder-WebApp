import React from "react";
import PropertyCard from "../../shared/Properties/PropertyCard";
import { useNavigate } from "react-router-dom";
import { Property } from "../../../entities/Property";

const Results = ({ filters, properties }) => {
  const navigate = useNavigate();

  // Crear instancias de Property para cada propiedad recibida desde el padre (Home)
  const allProperties = properties.map((propertyData) =>
    new Property(
      propertyData.id,
      propertyData.title,
      propertyData.price,
      propertyData.currency,
      propertyData.timePeriod,
      propertyData.floors,
      propertyData.type,
      propertyData.parking,
      propertyData.rooms,
      propertyData.bathrooms,
      propertyData.description,
      propertyData.features,
      propertyData.includes,
      propertyData.images,
      propertyData.contact,
      propertyData.region,
      propertyData.province,
      propertyData.district,
      propertyData.address
    )
  );

  // Verifica si todos los filtros tienen valor
  const isFiltersComplete = Object.values(filters).every((value) => value !== "" && value !== null);

  // Si los filtros no están completos, muestra todas las propiedades
  const filteredProperties = isFiltersComplete
    ? allProperties.filter((property) => {
        const isWithinPriceRange =
          (!filters.priceMin || property.price >= parseFloat(filters.priceMin)) &&
          (!filters.priceMax || property.price <= parseFloat(filters.priceMax));

        const isCurrencyMatch = !filters.currency || property.currency === filters.currency;
        const isTypeMatch = !filters.propertyType || property.type === filters.propertyType;
        const isFloorsMatch = !filters.floors || property.floors === parseInt(filters.floors);
        const isParkingMatch = !filters.parking || property.parking === parseInt(filters.parking);
        const isRoomsMatch = !filters.rooms || property.rooms === parseInt(filters.rooms);

        return (
          isWithinPriceRange &&
          isCurrencyMatch &&
          isTypeMatch &&
          isFloorsMatch &&
          isParkingMatch &&
          isRoomsMatch
        );
      })
    : allProperties; // Si no todos los filtros están completos, muestra todas las propiedades.

  // Ordenar las propiedades filtradas si se aplica el filtro de orden
  const sortedProperties = filteredProperties.sort((a, b) => {
    if (filters.sortOrder === "price-asc") {
      return a.price - b.price;
    } else if (filters.sortOrder === "price-desc") {
      return b.price - a.price;
    }
    return 0; // No hacer nada si no hay un orden específico
  });

  const handleViewProperty = (property) => {
    navigate(`/tenant/property/${property.id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {sortedProperties.length > 0 ? (
        sortedProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onRentClick={() => handleViewProperty(property)}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-100 rounded-lg">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6717/6717248.png"
            alt="No results"
            className="w-32 h-32 mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800">No se encontraron resultados</h2>
          <p className="text-gray-600">Prueba con otros filtros</p>
        </div>
      )}
    </div>
  );
};

export default Results;
