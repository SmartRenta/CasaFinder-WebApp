import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import { Typography, Button, Input } from "@material-tailwind/react";
import ContractService from "../../../services/contractService";
import SmartContractService from "../../../services/smartContractService";
import ContractContent from "../../../components/shared/Contracts/ContractContent";
import { getUserRoleFromCache } from "../../../utils/authUtils";

const CreateContractStepFour = () => {
  const { id } = useParams(); // ID del contrato
  const [contract, setContract] = useState({}); // Datos del contrato
  const [smartContract, setSmartContract] = useState(null); // Datos del Smart Contract
  const [account, setAccount] = useState(null); // Wallet conectada
  const [error, setError] = useState(""); // Mensaje de error
  const [success, setSuccess] = useState(""); // Mensaje de éxito
  const userRole = getUserRoleFromCache(); // Rol del usuario
  const web3 = new Web3(window.ethereum); // Inicializar Web3 con MetaMask

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        // Obtener datos del contrato
        const contractData = await ContractService.getContractById(id);
        setContract(contractData);

        // Si el contrato está aceptado y el rol es TENANT, buscar el Smart Contract asociado
        if (contractData.accepted && userRole === "TENANT") {
          const smartContracts = await SmartContractService.getAllSmartContracts();
          const selectedSmartContract = smartContracts.find(
            (sc) => sc.contract.id === parseInt(id, 10) // Comparar con el campo contract.id
          );

          if (selectedSmartContract) {
            setSmartContract(selectedSmartContract);
          } else {
            setError("No se encontró un Smart Contract asociado para este contrato.");
          }
        }
      } catch (err) {
        setError("Error al cargar los datos: " + err.message);
      }
    };

    fetchContractData();
  }, [id, userRole]);

  // Conectar MetaMask
  const connectMetaMask = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      setSuccess("MetaMask conectado con éxito.");
      setError("");
    } catch (err) {
      setError("Error al conectar MetaMask: " + err.message);
    }
  };

  // Consultar detalles del contrato
  const fetchContractDetails = async (contractAddress) => {
    try {
      const response = await fetch(
        `https://block-chain-eznga4uj3-michaelcarrillos-projects.vercel.app/contract-details/${contractAddress}`
      );
      const data = await response.json();
      return data; // Devuelve el JSON obtenido
    } catch (err) {
      setError("Error al obtener los detalles del contrato: " + err.message);
      return null;
    }
  };

  // Realizar el pago del alquiler y actualizar el Smart Contract
  const payRent = async () => {
    try {
      if (!smartContract?.contractAddress) {
        alert("Por favor, ingrese una dirección de Smart Contract.");
        return;
      }

      // Configuración del contrato
      const contractABI = [
        {
          inputs: [{ internalType: "uint256", name: "_rentAmount", type: "uint256" }],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "payRent",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ];

      const contractInstance = new web3.eth.Contract(contractABI, smartContract.contractAddress);

      // Realizar la transacción
      await contractInstance.methods.payRent().send({
        from: account,
        value: web3.utils.toWei(smartContract.paymentAmountETH.toString(), "ether"),
      });

      setSuccess("El alquiler se pagó con éxito.");
      setError("");

      // Consultar detalles del contrato después del pago
      const contractDetails = await fetchContractDetails(smartContract.contractAddress);

      if (contractDetails) {
        // Obtener el Smart Contract completo
        const fullSmartContract = await SmartContractService.getSmartContractById(smartContract.id);

        if (fullSmartContract) {
          // Modificar los campos necesarios
          fullSmartContract.payed = contractDetails.isPaid;
          fullSmartContract.tenantAddress = contractDetails.tenant;

          // Actualizar el Smart Contract con la data completa
          const updatedSmartContract = await SmartContractService.updateSmartContract(
            smartContract.id,
            fullSmartContract
          );

          if (updatedSmartContract) {
            setSmartContract(updatedSmartContract);
            setSuccess("El Smart Contract se actualizó correctamente.");
          } else {
            setError("Error al actualizar el Smart Contract.");
          }
        } else {
          setError("No se pudo obtener el Smart Contract completo para la actualización.");
        }
      }
    } catch (err) {
      setError("Error al procesar la transacción: " + err.message);
      setSuccess("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h2" className="ml-4 my-4 text-black text-xl">
        CONTRATO {contract.accepted == null ? "PENDIENTE" : contract.accepted ? "ACEPTADO" : "RECHAZADO"}
      </Typography>
      <div className="flex mb-6">
        <div className="w-1/5">
          <img
            src={
              contract.accepted
                ? "/images/icono_contrato_aceptado.png"
                : "/images/icono_contrato_rechazado.png"
            }
            alt="Estado del contrato"
            className="w-28 h-28"
          />
        </div>
        <div className="w-4/5">
          <small>15 de diciembre del 2024 a las 22:19 hrs</small>
          <Typography variant="h2" className="text-black text-xl">
            {contract.accepted ? (
              <div>Enhorabuena!!, <br /> el arrendador ha aceptado el contrato</div>
            ) : (
              <div>Lamentamos informarle que el arrendador ha rechazado el contrato</div>
            )}
          </Typography>
        </div>
      </div>

      <ContractContent contract={contract} />

      {/* Lógica de Smart Contract */}
      {userRole === "TENANT" && contract.accepted && smartContract && (
  <div className="bg-white p-6 rounded-lg shadow-md mt-6">
    {smartContract.payed ? (
      <Typography className="text-green-500 font-bold text-center">
        El alquiler ya fue pagado. Monto: {smartContract.paymentAmountETH} ETH.
      </Typography>
    ) : (
      <>
        {/* Nuevo mensaje aclaratorio */}
        <Typography className="text-gray-700 font-medium text-center mb-6">
          Para terminar el proceso, necesitas realizar el primer pago.
        </Typography>

        {/* Botón para conectar MetaMask */}
        <div className="flex flex-col items-center mb-4">
          <Button
            onClick={connectMetaMask}
            className="mb-4 bg-blue-500 text-white hover:bg-blue-600 w-64"
          >
            {account ? `Conectado: ${account}` : "Conectar MetaMask"}
          </Button>

          {/* Input de dirección del Smart Contract */}
          <div className="w-full md:w-2/3">
            <Input
              label="Dirección del Smart Contract"
              value={smartContract.contractAddress}
              readOnly
              className="border-gray-400"
            />
          </div>
        </div>

        {/* Botón para pagar el alquiler */}
        <div className="flex justify-center">
          <Button
            onClick={payRent}
            disabled={!smartContract.contractAddress || !account}
            className={`${
              smartContract.contractAddress && account
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-400 cursor-not-allowed"
            } text-white w-64`}
          >
            Pagar Alquiler
          </Button>
        </div>

        {/* Mensajes de éxito o error */}
        {success && <Typography className="text-green-500 font-bold text-center mt-4">{success}</Typography>}
        {error && <Typography className="text-red-500 font-bold text-center mt-4">{error}</Typography>}
      </>
    )}
  </div>
)}

    </div>
  );
};

export default CreateContractStepFour;
