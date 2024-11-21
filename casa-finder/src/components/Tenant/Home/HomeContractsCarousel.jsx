import React from "react";
import { FaArrowRight } from "react-icons/fa";
import HomeContractCard from "./HomeContractsCards.jsx";

const HomeContractCarousel = ({ contracts }) => {
    const isScrollable = contracts.length > 5; // Determina si es necesario el scroll horizontal

    return (
        <div className="relative w-full">
            {/* Mostrar mensaje si no hay contratos */}
            {contracts.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                    No hay contratos disponibles.
                </p>
            ) : (
                <>
                    {/* Carousel Wrapper */}
                    <div
                        className={`flex gap-4 ${
                            isScrollable ? "overflow-x-auto scrollbar-hide pb-4" : "flex-wrap"
                        }`}
                    >
                        {contracts.map((contract) => (
                            <div key={contract.id} className="shrink-0 w-64">
                                <HomeContractCard contract={contract} />
                            </div>
                        ))}
                    </div>

                    {/* Botón de navegación (si es scrollable) */}
                    {isScrollable && (
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                            <button className="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:scale-105">
                                <FaArrowRight className="w-6 h-6" />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default HomeContractCarousel;
