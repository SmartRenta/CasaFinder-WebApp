import React, { useEffect, useState } from "react";
import SmartContractService from "../../services/smartContractService";
import { getUserIdFromCache } from "../../utils/authUtils"; // Ajusta la ruta si es necesario

const Transfers = () => {
    const [transfers, setTransfers] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para indicar carga
    const [error, setError] = useState(null); // Estado para manejar errores
    const [noData, setNoData] = useState(false); // Estado para manejar ausencia de datos

    useEffect(() => {
        const fetchTransfers = async () => {
            try {
                const userId = parseInt(getUserIdFromCache(), 10);
                if (!userId) {
                    throw new Error("No se encontró el ID del usuario en el caché.");
                }

                const contracts = await SmartContractService.getAllSmartContracts();
                if (!contracts || !Array.isArray(contracts)) {
                    throw new Error("Error en los datos obtenidos del servidor.");
                }

                // Filtrar contratos por tenant.id y payed
                const filteredTransfers = contracts
                    .filter(
                        (contract) =>
                            contract.contract.tenant.id === userId && contract.payed
                    )
                    .map((contract) => ({
                        id: contract.id,
                        contractAddress: contract.contractAddress,
                        landlordAddress: contract.landlordAddress,
                        tenantAddress: contract.tenantAddress,
                        paymentAmountETH: contract.paymentAmountETH,
                        startDate: new Date(contract.contract.startDate).toLocaleDateString(),
                        propertyAddress: contract.contract.address,
                        propertyTitle: contract.contract.property?.title || "Sin título",
                    }));

                if (filteredTransfers.length === 0) {
                    setNoData(true); // No hay transferencias
                } else {
                    setTransfers(filteredTransfers);
                }
            } catch (error) {
                console.error("Error al cargar las transferencias:", error);
                setError(error.message || "Hubo un error en el servidor. Inténtalo más tarde.");
            } finally {
                setLoading(false); // Finaliza el estado de carga
            }
        };

        fetchTransfers();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-semibold mb-4">Cargando transferencias...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-2xl font-semibold mb-4 text-red-500">Oops!</h1>
                <p className="text-gray-500">{error}</p>
            </div>
        );
    }

    if (noData) {
        return (
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-2xl font-semibold mb-4">Transferencias Realizadas</h1>
                <p className="text-gray-500">No se encontraron transferencias realizadas.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Transferencias Realizadas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {transfers.map((transfer) => (
                    <div
                        key={transfer.id}
                        className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-start"
                    >
                        {/* Íconos de criptomoneda e inmobiliaria */}
                        <div className="flex items-center mb-4">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1067/1067281.png"
                                alt="Crypto"
                                className="h-12 w-12 mr-3"
                            />
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/888/888064.png"
                                alt="Real Estate"
                                className="h-12 w-12"
                            />
                        </div>

                        {/* Información relevante */}
                        <div className="text-sm text-gray-500 mb-2">
                            Fecha:{" "}
                            <span className="font-medium text-black">{transfer.startDate}</span>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                            Monto ETH:{" "}
                            <span className="font-medium text-black">
                                {transfer.paymentAmountETH.toFixed(5)} ETH
                            </span>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                            Dirección Propiedad:{" "}
                            <span className="font-medium text-black">{transfer.propertyAddress}</span>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                            Título Propiedad:{" "}
                            <span className="font-medium text-black">{transfer.propertyTitle}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                            Dirección Contrato:{" "}
                            <span className="font-medium text-black">{transfer.contractAddress}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Transfers;
