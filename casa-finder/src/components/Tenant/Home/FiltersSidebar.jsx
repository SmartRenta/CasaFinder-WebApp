import React, { useState, useEffect } from "react";

// Datos de los filtros en formato JSON
const filtersData = {
  propertyTypes: [
    { label: "Casa", value: "Casa" },
    { label: "Casa de Campo", value: "Casa de Campo" },
    { label: "Casa de Playa", value: "Casa de Playa" },
    { label: "Casa en Condominio", value: "Casa en Condominio" },
  ],
};

const FiltersSidebar = ({ filters, setFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState(filters);

  useEffect(() => {
    setSelectedFilters(filters);
  }, [filters]);

  // Función para manejar el cambio en los inputs
  const handleInputChange = (filterCategory, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterCategory]: value,
    }));
  };

  // Función para reiniciar los filtros seleccionados
  const resetFilters = () => {
    const resetState = {
      priceMin: "",
      priceMax: "",
      currency: "",
      propertyType: "",
      floors: "",
      parking: "",
      rooms: "",
      sortOrder: "",
    };
    setSelectedFilters(resetState);
    setFilters(resetState);  // Actualizamos el estado global de filtros
  };

  // Verificación para habilitar el botón de Filtrar solo si todos los campos requeridos están completos
  const isFormComplete = () => {
    return Object.values(selectedFilters).every((value) => value !== "" && value !== null);
  };

  // Actualizar los filtros cuando cambien
  const updateFilters = () => {
    setFilters(selectedFilters);
  };

  return (
    <div className="w-full lg:w-80 p-4 bg-gray-50 rounded-lg border">
      {/* Orden de Filtrado */}
      <div className="flex justify-between items-center mb-4">
        <label className="mr-2 text-gray-700 font-medium">Ordenar por</label>
        <select
          className="border p-2 rounded-md"
          value={selectedFilters.sortOrder}
          onChange={(e) => handleInputChange("sortOrder", e.target.value)}
        >
          <option value="price-asc">Precio menor a mayor</option>
          <option value="price-desc">Precio mayor a menor</option>
        </select>
      </div>

      <h3 className="font-semibold text-gray-800 mb-4">Filtros</h3>

      {/* Filtro: Rango de precio */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700">Rango de precio</h4>
        <div className="flex space-x-2 mb-2">
          <select
            className="w-20 px-3 py-2 border rounded"
            value={selectedFilters.currency}
            onChange={(e) => handleInputChange("currency", e.target.value)}
          >
            <option value="">Seleccionar moneda</option>
            <option value="PEN">PEN</option>
            <option value="USD">USD</option>
          </select>
          <input
            type="number"
            placeholder="Mínimo"
            className="w-full px-3 py-2 border rounded"
            value={selectedFilters.priceMin}
            onChange={(e) => handleInputChange("priceMin", e.target.value)}
          />
          <input
            type="number"
            placeholder="Máximo"
            className="w-full px-3 py-2 border rounded"
            value={selectedFilters.priceMax}
            onChange={(e) => handleInputChange("priceMax", e.target.value)}
          />
        </div>
      </div>

      {/* Filtro: Tipo de propiedad */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700">Tipo de propiedad</h4>
        <select
          name="propertyType"
          className="w-full px-3 py-2 border rounded"
          value={selectedFilters.propertyType}
          onChange={(e) => handleInputChange("propertyType", e.target.value)}
        >
          <option value="">Seleccionar tipo</option>
          {filtersData.propertyTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro: Pisos */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700">Pisos</h4>
        <input
          type="number"
          placeholder="Número de pisos"
          className="w-full px-3 py-2 border rounded"
          value={selectedFilters.floors}
          onChange={(e) => handleInputChange("floors", e.target.value)}
        />
      </div>

      {/* Filtro: Estacionamientos */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700">Estacionamientos</h4>
        <input
          type="number"
          placeholder="Número de estacionamientos"
          className="w-full px-3 py-2 border rounded"
          value={selectedFilters.parking}
          onChange={(e) => handleInputChange("parking", e.target.value)}
        />
      </div>

      {/* Filtro: Habitaciones */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700">Habitaciones</h4>
        <input
          type="number"
          placeholder="Número de habitaciones"
          className="w-full px-3 py-2 border rounded"
          value={selectedFilters.rooms}
          onChange={(e) => handleInputChange("rooms", e.target.value)}
        />
      </div>

      {/* Botones de Filtrar y Resetear */}
      <div className="flex gap-4 mt-4">
        <button
          className={`w-full py-2 rounded-md ${isFormComplete() ? "bg-primary text-white hover:bg-primary-dark" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          onClick={updateFilters}
          disabled={!isFormComplete()}
        >
          Filtrar
        </button>
        <button
          className="w-full bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
          onClick={resetFilters}
        >
          Resetear
        </button>
      </div>
    </div>
  );
};

export default FiltersSidebar;
