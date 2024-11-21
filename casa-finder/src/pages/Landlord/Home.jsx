import React, { useEffect, useState } from "react";
import HomePropertiesCarousel from "../../components/landLord/home/HomePropertiesCarousel.jsx";
import PropertyService from "../../services/propertyService";
import SmartContractService from "../../services/smartContractService"; // Servicio para las transferencias
import { getUserIdFromCache } from "../../utils/authUtils.js";

const Home = () => {
    const [propertiesData, setPropertiesData] = useState([]);
    const [transfersData, setTransfersData] = useState([]);

    // Cargar propiedades por Landlord
    useEffect(() => {
        const fetchProperties = async () => {
            const landlordId = getUserIdFromCache(); // Obtiene el ID del landlord desde el caché
            if (landlordId) {
                const loadedProperties = await PropertyService.getPropertiesByLandlord(landlordId);
                setPropertiesData(loadedProperties);
            }
        };

        fetchProperties();
    }, []);

    // Cargar transferencias filtradas por Landlord
    useEffect(() => {
        const fetchTransfers = async () => {
            try {
                const landlordId = parseInt(getUserIdFromCache(), 10);
                if (!landlordId) {
                    console.error("No se encontró el ID del usuario en el caché");
                    return;
                }

                const contracts = await SmartContractService.getAllSmartContracts();
                if (!contracts) {
                    console.error("No se pudieron obtener los contratos inteligentes");
                    return;
                }

                // Filtrar contratos por landlord.id y payed
                const filteredTransfers = contracts
                    .filter(contract => 
                        contract.contract.landlord.id === landlordId && contract.payed
                    )
                    .map(contract => ({
                        id: contract.id,
                        date: new Date(contract.contract.startDate).toLocaleDateString(),
                        paymentAmountETH: contract.paymentAmountETH.toFixed(5), // 5 cifras decimales
                        propertyTitle: contract.contract.property?.title || "Sin título",
                        propertyAddress: contract.contract.property?.address || "Sin dirección",
                        contractAddress: contract.contractAddress
                    }));

                setTransfersData(filteredTransfers);
            } catch (error) {
                console.error("Error al cargar las transferencias:", error);
            }
        };

        fetchTransfers();
    }, []);

    return (
        <div className="container mx-auto p-4">
            {/* Mis Propiedades */}
            <h2 className="my-2 text-xl font-semibold">Mis Propiedades</h2>
            {propertiesData.length > 0 ? (
                <HomePropertiesCarousel properties={propertiesData} />
            ) : (
                <p className="text-gray-500">No tienes propiedades registradas.</p>
            )}

            {/* Mis Transferencias */}
            <h2 className="my-2 text-xl font-semibold">Mis Transferencias</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {transfersData.length > 0 ? (
                    transfersData.map(transfer => (
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
                                Fecha: <span className="font-medium text-black">{transfer.date}</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-2">
                                Monto ETH: <span className="font-medium text-black">{transfer.paymentAmountETH} ETH</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-2">
                                Título Propiedad: <span className="font-medium text-black">{transfer.propertyTitle}</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-2">
                                Dirección Propiedad: <span className="font-medium text-black">{transfer.propertyAddress}</span>
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

export default Home;
