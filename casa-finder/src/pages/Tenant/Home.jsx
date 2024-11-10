import React, { useState } from "react";
import SearchBar from "../../components/Tenant/Home/SearchBar";
import SortOptions from "../../components/Tenant/Home/SortOptions";
import Results from "../../components/Tenant/Home/Results";
import FiltersSidebar from "../../components/Tenant/Home/FiltersSidebar";
import propertiesData from "../../data/propertiesData.json";  // Importamos los datos de propiedades

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

  const [allProperties, setAllProperties] = useState(propertiesData);  // Estado para almacenar todas las propiedades
  const [filteredProperties, setFilteredProperties] = useState(propertiesData);  // Estado para las propiedades filtradas

  // Función para actualizar los filtros
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  // Función para manejar los resultados de la búsqueda desde SearchBar
  const handleSearchResults = (searchFilters) => {
    // Llamamos a la función para filtrar las propiedades con los filtros de ubicación
    fetchPropertiesFromAPI(searchFilters);  
  };

  // Simulación de llamada a la API que recibe filtros de ubicación y retorna propiedades
  const fetchPropertiesFromAPI = (searchFilters) => {
    // Filtramos las propiedades por el departamento, provincia y distrito
    const filteredData = propertiesData.filter((property) => {
      const isDepartmentMatch = !searchFilters.department || property.region === searchFilters.department;
      const isProvinceMatch = !searchFilters.province || property.province === searchFilters.province;
      const isDistrictMatch = !searchFilters.district || property.district === searchFilters.district;

      return isDepartmentMatch && isProvinceMatch && isDistrictMatch;
    });

    setAllProperties(filteredData);  // Establece las propiedades con los resultados de la búsqueda
    applyFilters(filteredData);  // Aplica los filtros adicionales (precio, tipo de propiedad, etc.)
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
