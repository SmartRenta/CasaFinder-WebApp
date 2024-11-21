import React from "react";
import { FaArrowRight } from "react-icons/fa";
import HomeContractCard from "./HomeContractsCards.jsx";

const HomeContractCarousel = ({ contracts }) => {
    const isScrollable = contracts.length > 5;

    return (
        <div className="relative w-full">
            {contracts.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                    No hay contratos disponibles.
                </p>
            ) : (
                <>
                    {/* Carousel Wrapper */}
                    <div
                        className={`grid gap-6 pb-4 ${
                            isScrollable
                                ? "grid-flow-col auto-cols-[minmax(16rem,1fr)] overflow-x-auto scrollbar-hide"
                                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        }`}
                    >
                        {contracts.map((contract) => (
                            <HomeContractCard key={contract.id} contract={contract} />
                        ))}
                    </div>

                    {/* Next Button (optional, visible only if scrollable) */}
                    {isScrollable && (
                        <button
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-sky-500 hover:bg-sky-600 text-white py-2 px-3 rounded-full shadow-lg z-10"
                        >
                            <FaArrowRight className="w-6 h-6" />
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default HomeContractCarousel;
