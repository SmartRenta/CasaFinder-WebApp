import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Typography, Button, Card, CardBody } from "@material-tailwind/react";
import { useParams, useNavigate } from "react-router-dom";
import ContractService from "../../services/contractService";
import SmartContractService from "../../services/smartContractService";
import ContractContent from "../../components/shared/Contracts/ContractContent";
import { getUserRoleFromCache } from "../../utils/authUtils";

const ContractDetails = () => {
    const { id } = useParams();
    const userRole = getUserRoleFromCache();
    const navigate = useNavigate();

    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [contractDetails, setContractDetails] = useState(null);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const web3 = new Web3(window.ethereum);

    useEffect(() => {
        const fetchContract = async () => {
            const fetchedContract = await ContractService.getContractById(id);
            if (fetchedContract) {
                setContract(fetchedContract);
            } else {
                console.error("Contrato no encontrado");
            }
        };
        fetchContract();
    }, [id]);

    const connectMetaMask = async () => {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccount(accounts[0]);
            setError("");
            console.log(`Conectado a MetaMask: ${accounts[0]}`);
        } catch (err) {
            setError("Error al conectar MetaMask: " + err.message);
            console.error(err.message);
        }
    };

    const fetchContractData = async () => {
        try {
            const response = await fetch(
                "https://block-chain-eznga4uj3-michaelcarrillos-projects.vercel.app/contract-data"
            );
            return await response.json();
        } catch (err) {
            throw new Error("Error al obtener los datos del contrato: " + err.message);
        }
    };

    const fetchContractDetails = async (address) => {
        try {
            const response = await fetch(
                `https://block-chain-eznga4uj3-michaelcarrillos-projects.vercel.app/contract-details/${address}`
            );
            return await response.json();
        } catch (err) {
            throw new Error("Error al obtener los detalles del contrato: " + err.message);
        }
    };

    const saveSmartContract = async (blockchainData, contractAddress) => {
        try {
            const smartContractData = {
                contractAddress: contractAddress,
                landlordAddress: blockchainData.landlord,
                tenantAddress: blockchainData.tenant,
                paymentAmountETH: blockchainData.rentAmount,
                payed: blockchainData.isPaid,
                contract: { ...contract },
            };
            return await SmartContractService.createSmartContract(smartContractData);
        } catch (err) {
            throw new Error("Error al guardar el Smart Contract: " + err.message);
        }
    };


    const convertToEthereum = (priceInUSD) => {
        const ethToUsdRate = 0.00033; // Tipo de cambio de 1 USD a ETH
        return priceInUSD * ethToUsdRate; // Conversión de USD a ETH
    };

    const createBlockchainContract = async () => {
        if (!account) {
            setError("MetaMask no está conectado. Conéctate antes de continuar.");
            return false;
        }

        setIsLoading(true);
        try {
            if (!contract || !contract.property || !contract.property.price) {
                throw new Error("No se encontró el precio de la propiedad.");
            }

            const rentAmountInEther = convertToEthereum(contract.property.price);

            const contractData = await fetchContractData();
            const { abi, bytecode } = contractData || {};
            if (!abi || !bytecode) {
                throw new Error("ABI o bytecode del contrato no disponible.");
            }

            const blockchainContract = new web3.eth.Contract(abi);

            const gas = await blockchainContract
                .deploy({
                    data: bytecode,
                    arguments: [web3.utils.toWei(rentAmountInEther, "ether")],
                })
                .estimateGas({ from: account });

            const instance = await blockchainContract
                .deploy({
                    data: bytecode,
                    arguments: [web3.utils.toWei(rentAmountInEther, "ether")],
                })
                .send({ from: account, gas });

            console.log("Contrato creado en blockchain:", instance.options.address);

            const blockchainData = await fetchContractDetails(instance.options.address);
            if (blockchainData) {
                await saveSmartContract(blockchainData, instance.options.address);
                setContractDetails(blockchainData);
                setShowConfirmation(true);

                // Actualizar el estado del contrato a "ACEPTADO"
                 await ContractService.setContractResponseById(id, true);
            }

            return true;
        } catch (err) {
            setError("Error al crear el contrato en blockchain: " + err.message);
            console.error(err.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateStatus = async (newStatus) => {
        setIsLoading(true);
        try {
            if (newStatus === "ACEPTADO") {
                if (!account) {
                    setError("Debes conectar MetaMask para aceptar el contrato.");
                    setIsLoading(false);
                    return;
                }

                const blockchainSuccess = await createBlockchainContract();
                if (!blockchainSuccess) {
                    console.error("Error en blockchain, deteniendo actualización.");
                    setIsLoading(false);
                    return;
                }
            } else {
                // Actualizar el estado del contrato a "RECHAZADO"
                await ContractService.setContractResponseById(id, false);
                navigate("/landlord/contratos");
            }
        } catch (error) {
            console.error("Error al actualizar el contrato:", error);
            setError("Error al actualizar el contrato: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const confirmAndNavigate = () => {
        navigate("/landlord/contratos");
    };

    if (!contract) {
        return (
            <Card className="my-4 p-4">
                <Typography variant="h4" color="red">
                    No se encontró información relacionada.
                </Typography>
            </Card>
        );
    }

    return (
        <div>
            <Typography variant="h2" className="ml-4 my-4 text-black text-xl">
                CONTRATO {contract.status}
            </Typography>

            <ContractContent contract={contract} />

            {userRole === "LANDLORD" && contract.status === "PENDIENTE" && (
                <>
                    {!account ? (
                        <Button
                            onClick={connectMetaMask}
                            className="mb-4 bg-blue-500 text-white hover:bg-blue-600"
                        >
                            Conectar MetaMask
                        </Button>
                    ) : (
                        <Card className="my-4 bg-green-100">
                            <CardBody>
                                <Typography variant="h6" color="green">
                                    MetaMask conectado: <strong>{account}</strong>
                                </Typography>
                            </CardBody>
                        </Card>
                    )}

                    <div className="mt-6 flex justify-around">
                        <Button
                            onClick={() => handleUpdateStatus("ACEPTADO")}
                            disabled={isLoading}
                            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                        >
                            {isLoading ? "Procesando..." : "Aceptar"}
                        </Button>
                        <Button
                            onClick={() => handleUpdateStatus("RECHAZADO")}
                            disabled={isLoading}
                            className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400"
                        >
                            Rechazar
                        </Button>
                    </div>
                </>
            )}

            {showConfirmation && contractDetails && (
                <Card className="my-4 bg-blue-100">
                    <CardBody>
                        <Typography variant="h5" color="blue">
                            Contrato creado exitosamente
                        </Typography>
                         
                        <Button
                            onClick={confirmAndNavigate}
                            className="mt-4 bg-green-500 text-white"
                        >
                            Aceptar y continuar
                        </Button>
                    </CardBody>
                </Card>
            )}

            {error && (
                <Card className="my-4 bg-red-100">
                    <CardBody>
                        <Typography variant="h6" color="red">
                            Error
                        </Typography>
                        <Typography>{error}</Typography>
                    </CardBody>
                </Card>
            )}
        </div>
    );
};

export default ContractDetails;
