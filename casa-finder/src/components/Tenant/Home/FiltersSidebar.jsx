import React, { useState } from "react";

// Datos de los filtros en formato JSON
const filtersData = {
  priceRange: [
    { label: "Menor a S/ 10,000.00", value: "range1" },
    { label: "S/ 10,000.00 a S/ 20,000.00", value: "range2" },
    { label: "S/ 20,000.00 a S/ 30,000.00", value: "range3" },
    { label: "S/ 30,000.00 a S/ 40,000.00", value: "range4" },
    { label: "S/ 40,000.00 a S/ 50,000.00", value: "range5" },
  ],
  propertyTypes: [
    { label: "Casa", value: "house" },
    { label: "Casa de campo", value: "countryHouse" },
    { label: "Casa de playa", value: "beachHouse" },
    { label: "Casa en condominio", value: "condo" },
  ],
  floors: [
    { label: "1 piso", value: "1floor" },
    { label: "2 pisos", value: "2floors" },
    { label: "3 pisos", value: "3floors" },
    { label: "4 pisos", value: "4floors" },
  ],
  parking: [
    { label: "1 vehículo", value: "1vehicle" },
    { label: "2 vehículos", value: "2vehicles" },
    { label: "3 vehículos", value: "3vehicles" },
    { label: "4 vehículos", value: "4vehicles" },
  ],
  rooms: [
    { label: "4 habitaciones", value: "4rooms" },
    { label: "6 habitaciones", value: "6rooms" },
    { label: "8 habitaciones", value: "8rooms" },
  ],
};

const FiltersSidebar = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: "",
    propertyTypes: "",
    floors: "",
    parking: "",
    rooms: "",
  });

  // Función para manejar el cambio en los radio buttons
  const handleRadioChange = (filterCategory, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterCategory]: value,
    }));
  };

  return (
    <div className="w-full lg:w-80 p-4 bg-gray-50 rounded-lg border">
      <h3 className="font-semibold text-gray-800 mb-4">Filtros</h3>

      {/* Filtro: Rango de precio */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700">Rango de precio</h4>
        <div className="space-y-2">
          {filtersData.priceRange.map((range) => (
            <label key={range.value} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                className="mr-2 rounded-full"
                value={range.value}
                checked={selectedFilters.priceRange === range.value}
                onChange={() => handleRadioChange("priceRange", range.value)}
              />
              {range.label}
            </label>
          ))}
        </div>
   
      </div>

      {/* Filtro: Tipo de propiedad */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700">Tipo de propiedad</h4>
        <div className="space-y-2">
          {filtersData.propertyTypes.map((type) => (
            <label key={type.value} className="flex items-center">
              <input
                type="radio"
                name="propertyTypes"
                className="mr-2 rounded-full"
                value={type.value}
                checked={selectedFilters.propertyTypes === type.value}
                onChange={() => handleRadioChange("propertyTypes", type.value)}
              />
              {type.label}
            </label>
          ))}
        </div>
      </div>

      {/* Filtro: Pisos */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700">Pisos</h4>
        <div className="space-y-2">
          {filtersData.floors.map((floor) => (
            <label key={floor.value} className="flex items-center">
              <input
                type="radio"
                name="floors"
                className="mr-2 rounded-full"
                value={floor.value}
                checked={selectedFilters.floors === floor.value}
                onChange={() => handleRadioChange("floors", floor.value)}
              />
              {floor.label}
            </label>
          ))}
        </div>
      </div>

      {/* Filtro: Estacionamientos */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700">Estacionamientos</h4>
        <div className="space-y-2">
          {filtersData.parking.map((parking) => (
            <label key={parking.value} className="flex items-center">
              <input
                type="radio"
                name="parking"
                className="mr-2 rounded-full"
                value={parking.value}
                checked={selectedFilters.parking === parking.value}
                onChange={() => handleRadioChange("parking", parking.value)}
              />
              {parking.label}
            </label>
          ))}
        </div>
      </div>

      {/* Filtro: Habitaciones */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700">Habitaciones</h4>
        <div className="space-y-2">
          {filtersData.rooms.map((room) => (
            <label key={room.value} className="flex items-center">
              <input
                type="radio"
                name="rooms"
                className="mr-2 rounded-full"
                value={room.value}
                checked={selectedFilters.rooms === room.value}
                onChange={() => handleRadioChange("rooms", room.value)}
              />
              {room.label}
            </label>
          ))}
        </div>
      </div>

      {/* Botón de Filtrar */}
      <button
        className="w-full bg-primary text-white py-2 rounded-md mt-4 hover:bg-primary-dark"
        onClick={() => console.log("Filtrar propiedades")}
      >
        Filtrar
      </button>
    </div>
  );
};

export default FiltersSidebar;
