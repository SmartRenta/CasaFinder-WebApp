import React, { useState, useEffect } from "react";
import locationsData from "../../../data/locations.json"; 

const SearchBar = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

   useEffect(() => {
    if (selectedDepartment) {
      const department = locationsData.departments.find(
        (dept) => dept.name === selectedDepartment
      );
      setProvinces(department?.provinces || []);
      setSelectedProvince(""); 
      setDistricts([]); 
      setSelectedDistrict(""); 
    } else {
      setProvinces([]);
      setDistricts([]);
    }
  }, [selectedDepartment]);

  // Actualizar los distritos cuando la provincia cambie
  useEffect(() => {
    if (selectedProvince) {
      setDistricts(locationsData.districts[selectedProvince] || []);
    } else {
      setDistricts([]);
      setSelectedDistrict("");
    }
  }, [selectedProvince]);

  const handleSearch = () => {
    // Lógica para manejar la búsqueda
    console.log("Departamento:", selectedDepartment);
    console.log("Provincia:", selectedProvince);
    console.log("Distrito:", selectedDistrict);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-4">
         <div className="w-full lg:w-1/4">
          <label className="block text-gray-700 font-medium">Departamento</label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
          >
            <option value="">Selecciona un departamento</option>
            {locationsData.departments.map((dept) => (
              <option key={dept.name} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

         <div className="w-full lg:w-1/4">
          <label className="block text-gray-700 font-medium">Provincia</label>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
            disabled={!selectedDepartment}
          >
            <option value="">Selecciona una provincia</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>

         <div className="w-full lg:w-1/4">
          <label className="block text-gray-700 font-medium">Distrito</label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
            disabled={!selectedProvince}
          >
            <option value="">Selecciona un distrito</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

         <div className="w-full lg:w-auto lg:ml-4">
          <button
            onClick={handleSearch}
            className="bg-primary text-white px-4 py-2 rounded-md mt-6 lg:mt-0 w-full lg:w-auto"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
