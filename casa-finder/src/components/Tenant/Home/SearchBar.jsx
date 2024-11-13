import React, { useState, useEffect } from "react";
import locationsData from "../../../data/locations.json"; 

const SearchBar = ({ onSearch }) => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // Maneja la selección del departamento y carga las provincias correspondientes
  useEffect(() => {
    if (selectedDepartment) {
      const department = locationsData.find(
        (dept) => dept.region === selectedDepartment
      );
      setProvinces(department?.provincias || []);
      setSelectedProvince(""); 
      setDistricts([]); 
      setSelectedDistrict(""); 
    } else {
      setProvinces([]);
      setDistricts([]);
    }
  }, [selectedDepartment]);

  // Maneja la selección de la provincia y carga los distritos correspondientes
  useEffect(() => {
    if (selectedProvince) {
      const province = provinces.find(
        (prov) => prov.provincia === selectedProvince
      );
      setDistricts(province?.distritos || []);
    } else {
      setDistricts([]);
      setSelectedDistrict("");
    }
  }, [selectedProvince, provinces]);

  // Función para manejar la búsqueda y pasar los filtros al componente de resultados
  const handleSearch = () => {
    onSearch({
      department: selectedDepartment,
      province: selectedProvince,
      district: selectedDistrict,
    });
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
            {locationsData.map((dept) => (
              <option key={dept.region} value={dept.region}>
                {dept.region}
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
              <option key={province.provincia} value={province.provincia}>
                {province.provincia}
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
