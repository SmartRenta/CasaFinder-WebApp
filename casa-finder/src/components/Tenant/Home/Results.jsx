const Results = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-100 rounded-lg">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6717/6717248.png"
          alt="No results"
          className="w-32 h-32 mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-800">No se encontraron resultados</h2>
        <p className="text-gray-600">Prueba con otros filtros</p>
      </div>
    );
  };
  
  export default Results;
  