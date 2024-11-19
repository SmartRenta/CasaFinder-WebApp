import React, { useState, useEffect } from "react";
import HomeContractCarousel from "../../components/landLord/home/HomeContractsCarousel.jsx";
import { List, Typography, Card, IconButton } from "@material-tailwind/react";
import contractsJson from "../../data/contracts.json"; 
import { getUserIdFromCache } from "../../utils/authUtils";
import ContractService from "../../services/contractService.js";

const Contracts = () => {

  const [contractsData, setContractsData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {

            const userId = getUserIdFromCache();
            const data = await ContractService.getAllContractsById(userId);
            setContractsData(data);
        }
        fetchData();
    }, []);

  const pendientes = contractsData.filter(c => c.accepted == null);
  const aceptados = contractsData.filter(c => c.accepted == true);
  const rechazados = contractsData.filter(c => c.accepted == false);

  return (
    <>
      <Typography variant="h2" className="text-black text-xl my-4">
        CONTRATOS
      </Typography>

      <Typography variant="h6" className="text-black my-4">
        Contratos pendientes
      </Typography>
      <HomeContractCarousel contracts={pendientes} />
      
      <Typography variant="h6" className="text-black my-4">
        Contratos aceptados
      </Typography>
      <HomeContractCarousel contracts={aceptados} />

      <Typography variant="h6" className="text-black my-4">
        Contratos rechazados
      </Typography>
      <HomeContractCarousel contracts={rechazados} />
      
    </>
  );


};

export default Contracts;
