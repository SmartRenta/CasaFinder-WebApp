import React from "react";
import SearchBar from "../../components/Tenant/Home/SearchBar";
import SortOptions from "../../components/Tenant/Home/SortOptions";
import Results from "../../components/Tenant/Home/Results";
import FiltersSidebar from "../../components/Tenant/Home/FiltersSidebar";

const Home = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col space-y-4">
        <SearchBar />
      </div>

      <div className="flex flex-col lg:flex-row-reverse gap-6 mt-6">
        <div className="lg:w-80 w-full"> 
          <SortOptions />
          <FiltersSidebar />
        </div>

        <div className="flex-1">
          <Results />
        </div>
      </div>
    </div>
  );
};

export default Home;
