import React from "react";
import HomeContractCarousel from "../../components/landLord/home/HomeContractsCarousel.jsx";
import { List, Typography, Card, IconButton } from "@material-tailwind/react";
import contractsJson from "../../data/contracts.json"; 

const Contracts = () => {

  const pendientes = contractsJson.filter(c => c.estado == 1);
  const activos = contractsJson.filter(c => c.estado == 2);
  const inactivos = contractsJson.filter(c => c.estado == 3);

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
        Contratos activos
      </Typography>
      <HomeContractCarousel contracts={activos} />

      <Typography variant="h6" className="text-black my-4">
        Contratos inactivos
      </Typography>
      <HomeContractCarousel contracts={inactivos} />
      
    </>
  );


};

export default Contracts;
