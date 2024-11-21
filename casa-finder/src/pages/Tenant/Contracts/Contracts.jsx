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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getUserIdFromCache();
        const data = await ContractService.getAllContractsByTenantId(userId);
        setContractsData(data);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtrado optimizado con useMemo
  const pendientes = useMemo(
    () => contractsData.filter((c) => c.accepted == null),
    [contractsData]
  );
  const aceptados = useMemo(
    () => contractsData.filter((c) => c.accepted === true),
    [contractsData]
  );
  const rechazados = useMemo(
    () => contractsData.filter((c) => c.accepted === false),
    [contractsData]
  );

  if (loading) {
    return <Typography>Cargando contratos...</Typography>;
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
