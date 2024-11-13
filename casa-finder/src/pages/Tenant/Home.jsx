import React, { useState } from "react";
import SearchBar from "../../components/Tenant/Home/SearchBar";
import SortOptions from "../../components/Tenant/Home/SortOptions";
import Results from "../../components/Tenant/Home/Results";
import FiltersSidebar from "../../components/Tenant/Home/FiltersSidebar";
import PropertyService from "../../services/propertyService";  

const Home = () => {
  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    currency: "",
    propertyType: "",
    floors: "",
    parking: "",
    rooms: "",
    sortOrder: "",
  });

  const [allProperties, setAllProperties] = useState([]);  // Estado inicial vacío para almacenar todas las propiedades
  const [filteredProperties, setFilteredProperties] = useState([]);  // Estado para las propiedades filtradas

  // Función para actualizar los filtros
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  // Función para manejar los resultados de la búsqueda desde SearchBar
  const handleSearchResults = (searchFilters) => {
    fetchPropertiesFromAPI(searchFilters);  // Llamada a la API para filtrar las propiedades por ubicación
  };

  // Llamada a la API para obtener propiedades filtradas por ubicación
  const fetchPropertiesFromAPI = async (searchFilters) => {
    const { department, province, district } = searchFilters;
    try {
      const response = await PropertyService.findPropertiesByLocation(department, province, district);
      setAllProperties(response);  // Establece las propiedades con los resultados de la búsqueda
      applyFilters(response);  // Aplica los filtros adicionales (precio, tipo de propiedad, etc.)
    } catch (error) {
      console.error("Error al obtener propiedades:", error);
      setAllProperties([]);  // Resetea en caso de error
    }
  };

  // Función para aplicar los filtros adicionales
  const applyFilters = (properties) => {
    const filtered = properties.filter((property) => {
      const isPriceInRange =
        (!filters.priceMin || property.price >= parseFloat(filters.priceMin)) &&
        (!filters.priceMax || property.price <= parseFloat(filters.priceMax));

      const isCurrencyMatch = !filters.currency || property.currency === filters.currency;
      const isTypeMatch = !filters.propertyType || property.type === filters.propertyType;
      const isFloorsMatch = !filters.floors || property.floors === parseInt(filters.floors);
      const isParkingMatch = !filters.parking || property.parking === parseInt(filters.parking);
      const isRoomsMatch = !filters.rooms || property.rooms === parseInt(filters.rooms);

      return (
        isPriceInRange &&
        isCurrencyMatch &&
        isTypeMatch &&
        isFloorsMatch &&
        isParkingMatch &&
        isRoomsMatch
      );
    });

    // Aplica el orden de precios si corresponde
    const sortedProperties = filtered.sort((a, b) => {
      if (filters.sortOrder === "price-asc") {
        return a.price - b.price;
      } else if (filters.sortOrder === "price-desc") {
        return b.price - a.price;
      }
      return 0;  // Si no se aplica un orden, no hace nada
    });

    setFilteredProperties(sortedProperties);  // Actualiza las propiedades filtradas
  };

  return (
    <div className="p-4">
      <div className="flex flex-col space-y-4">
        <SearchBar onSearch={handleSearchResults} />  {/* Pasa la función para manejar los resultados */}
      </div>

      <div className="flex flex-col lg:flex-row-reverse gap-6 mt-6">
        <div className="lg:w-80 w-full">
          <FiltersSidebar filters={filters} setFilters={updateFilters} />
        </div>

        <div className="flex-1">
          <Results filters={filters} properties={filteredProperties} />  {/* Pasa las propiedades filtradas */}
        </div>
      </div>
    </div>
  );
};

export default Home;
