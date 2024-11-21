import React, { useState, useEffect, useMemo } from "react";
import HomeContractCarousel from "../../../components/Tenant/Home/HomeContractsCarousel.jsx";
import { Typography } from "@material-tailwind/react";
import { getUserIdFromCache } from "../../../utils/authUtils.js";
import ContractService from "../../../services/contractService.js";

// Componente para una sección de contratos
const ContractSection = ({ title, contracts }) => (
  <>
    <Typography variant="h6" className="text-black my-4">
      {title}
    </Typography>
    <HomeContractCarousel contracts={contracts} />
  </>
);

const Contracts = () => {
  const [contractsData, setContractsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getUserIdFromCache();
        if (!userId) {
          throw new Error("El usuario no está autenticado.");
        }
        const data = await ContractService.getAllContractsByTenantId(userId);
        if (!data || !Array.isArray(data)) {
          throw new Error("Datos inválidos recibidos del servidor.");
        }
        setContractsData(data);
      } catch (error) {
        console.error("Error fetching contracts:", error);
        setError(
          error.message || "Hubo un error en el servidor. Por favor, inténtalo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtrado optimizado con useMemo, validando que contractsData sea un array
  const pendientes = useMemo(
    () => (Array.isArray(contractsData) ? contractsData.filter((c) => c.accepted == null) : []),
    [contractsData]
  );
  const aceptados = useMemo(
    () => (Array.isArray(contractsData) ? contractsData.filter((c) => c.accepted === true) : []),
    [contractsData]
  );
  const rechazados = useMemo(
    () => (Array.isArray(contractsData) ? contractsData.filter((c) => c.accepted === false) : []),
    [contractsData]
  );

  if (loading) {
    return <Typography>Cargando contratos...</Typography>;
  }

  if (error) {
    return (
      <div className="text-center">
        <Typography variant="h6" className="text-red-500">
          Oops!
        </Typography>
        <Typography>{error}</Typography>
      </div>
    );
  }

  return (
    <>
      <Typography variant="h2" className="text-black text-xl my-4">
        CONTRATOS
      </Typography>
      <ContractSection title="Contratos pendientes" contracts={pendientes} />
      <ContractSection title="Contratos aceptados" contracts={aceptados} />
      <ContractSection title="Contratos rechazados" contracts={rechazados} />
    </>
  );
};

export default Contracts;
