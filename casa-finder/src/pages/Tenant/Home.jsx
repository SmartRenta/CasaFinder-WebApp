import React, { useState, useEffect } from "react";
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

  const [allProperties, setAllProperties] = useState([]);  
  const [filteredProperties, setFilteredProperties] = useState([]); 

  // Cargar todas las propiedades al montar el componente
  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const response = await PropertyService.getAllProperties();
        setAllProperties(response);
        setFilteredProperties(response); 
      } catch (error) {
        console.error("Error al obtener todas las propiedades:", error);
        setAllProperties([]);
        setFilteredProperties([]);
      }
    };

    fetchAllProperties();
  }, []);

  
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    applyFilters(allProperties, newFilters);  
  };

  
  const handleSearchResults = (searchFilters) => {
    
    if (!searchFilters.department && !searchFilters.province && !searchFilters.district) {
      setFilteredProperties(allProperties);  
    } else {
      fetchPropertiesByLocation(searchFilters);  
    }
  };

  
  const fetchPropertiesByLocation = async (searchFilters) => {
    const { department, province, district } = searchFilters;
    try {
      const response = await PropertyService.findPropertiesByLocation(department, province, district);
      setFilteredProperties(response);  
      applyFilters(response, filters);  
    } catch (error) {
      console.error("Error al obtener propiedades por ubicación:", error);
      setFilteredProperties([]); 
    }
  };

  
  const applyFilters = (properties, activeFilters) => {
    const filtered = properties.filter((property) => {
      const isPriceInRange =
        (!activeFilters.priceMin || property.price >= parseFloat(activeFilters.priceMin)) &&
        (!activeFilters.priceMax || property.price <= parseFloat(activeFilters.priceMax));

      const isCurrencyMatch = !activeFilters.currency || property.currency === activeFilters.currency;
      const isTypeMatch = !activeFilters.propertyType || property.type === activeFilters.propertyType;
      const isFloorsMatch = !activeFilters.floors || property.floors === parseInt(activeFilters.floors);
      const isParkingMatch = !activeFilters.parking || property.parking === parseInt(activeFilters.parking);
      const isRoomsMatch = !activeFilters.rooms || property.rooms === parseInt(activeFilters.rooms);

      return (
        isPriceInRange &&
        isCurrencyMatch &&
        isTypeMatch &&
        isFloorsMatch &&
        isParkingMatch &&
        isRoomsMatch
      );
    });

    
    const sortedProperties = filtered.sort((a, b) => {
      if (activeFilters.sortOrder === "price-asc") {
        return a.price - b.price;
      } else if (activeFilters.sortOrder === "price-desc") {
        return b.price - a.price;
      }
      return 0;  
    });

    setFilteredProperties(sortedProperties);  
  };

  return (
    <div className="p-4">
      <div className="flex flex-col space-y-4">
        <SearchBar onSearch={handleSearchResults} />  
      </div>

      <div className="flex flex-col lg:flex-row-reverse gap-6 mt-6">
        <div className="lg:w-80 w-full">
          <FiltersSidebar filters={filters} setFilters={updateFilters} />
        </div>

        <div className="flex-1">
          <Results filters={filters} properties={filteredProperties} />  
        </div>
      </div>
    </div>
  );
};

export default Home;
