const SortOptions = () => {
    return (
      <div className="flex justify-end mb-4">
        <label className="mr-2 text-gray-700">Ordenar por</label>
        <select className="border p-2 rounded-md">
          <option value="price-asc">Precio menor a mayor</option>
          <option value="price-desc">Precio mayor a menor</option>
        </select>
      </div>
    );
  };
  
  export default SortOptions;
  