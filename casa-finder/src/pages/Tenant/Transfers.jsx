import React, { useEffect, useState } from "react";
import SmartContractService from "../../services/smartContractService";
import { getUserIdFromCache } from "../../utils/authUtils"; // Ajusta la ruta si es necesario

const Transfers = () => {
    const [transfers, setTransfers] = useState([]);

    useEffect(() => {
        const fetchTransfers = async () => {
            try {
                const userId = parseInt(getUserIdFromCache(), 10);
                if (!userId) {
                    console.error("No se encontró el ID del usuario en el caché");
                    return;
                }

                const contracts = await SmartContractService.getAllSmartContracts();
                if (!contracts) {
                    console.error("No se pudieron obtener los contratos inteligentes");
                    return;
                }

                // Filtrar contratos por tenant.id y payed
                const filteredTransfers = contracts
                    .filter(contract => 
                        contract.contract.tenant.id === userId && contract.payed
                    )
                    .map(contract => ({
                        id: contract.id,
                        contractAddress: contract.contractAddress,
                        landlordAddress: contract.landlordAddress,
                        tenantAddress: contract.tenantAddress,
                        paymentAmountETH: contract.paymentAmountETH,
                        startDate: new Date(contract.contract.startDate).toLocaleDateString(),
                        propertyAddress: contract.contract.address,
                        propertyTitle: contract.contract.property?.title || "Sin título",
                    }));

                setTransfers(filteredTransfers);
            } catch (error) {
                console.error("Error al cargar las transferencias:", error);
            }
        };

        fetchTransfers();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Transferencias Realizadas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {transfers.length > 0 ? (
                    transfers.map(transfer => (
                        <div
                            key={transfer.id}
                            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-start"
                        >
                            {/* Íconos de criptomoneda e inmobiliaria */}
                            <div className="flex items-center mb-4">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/1067/1067281.png" // Ícono de criptomoneda
                                    alt="Crypto"
                                    className="h-12 w-12 mr-3"
                                />
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/888/888064.png" // Ícono inmobiliario
                                    alt="Real Estate"
                                    className="h-12 w-12"
                                />
                            </div>

                            {/* Información relevante */}
                            <div className="text-sm text-gray-500 mb-2">
                                Fecha: <span className="font-medium text-black">{transfer.startDate}</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-2">
                                Monto ETH: <span className="font-medium text-black">{transfer.paymentAmountETH.toFixed(5)} ETH</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-2">
                                Dirección Propiedad: <span className="font-medium text-black">{transfer.propertyAddress}</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-2">
                                Título Propiedad: <span className="font-medium text-black">{transfer.propertyTitle}</span>
                            </div>
                            <div className="text-sm text-gray-500">
                                Dirección Contrato: <span className="font-medium text-black">{transfer.contractAddress}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No se encontraron transferencias realizadas.</p>
                )}
            </div>
        </div>
    );
};

export default Transfers;
