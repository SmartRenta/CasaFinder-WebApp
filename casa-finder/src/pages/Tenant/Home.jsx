import React from "react";
import SearchBar from "../../components/Tenant/SearchBar";
import SortOptions from "../../components/Tenant/SortOptions";
import Results from "../../components/Tenant/Results";
import FiltersSidebar from "../../components/Tenant/FiltersSidebar";

const Home = () => {
  return (
    <div className="p-4">
      {/* Contenedor de la barra de búsqueda y las opciones de orden */}
      <div className="flex flex-col space-y-4">
        <SearchBar />
        <SortOptions />
      </div>

      {/* Contenedor flexible para los resultados y el sidebar */}
      <div className="flex flex-col lg:flex-row-reverse gap-6 mt-6">
        {/* Sidebar de filtros que se mantiene en la parte derecha en pantallas grandes */}
        <div className="lg:w-64 w-full">
          <FiltersSidebar />
        </div>

        {/* Contenedor de los resultados que se ajusta a todo el espacio disponible */}
        <div className="flex-1">
          <Results />
        </div>
      </div>
    </div>
  );
};

export default Home;
