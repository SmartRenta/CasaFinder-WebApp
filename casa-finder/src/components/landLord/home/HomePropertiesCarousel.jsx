import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PropertyCard from "../../shared/Properties/PropertyCard.jsx";

const HomePropertiesCarousel = ({ properties }) => {
    const [scrollIndex, setScrollIndex] = useState(0);
    const itemsPerView = 3; // Número de propiedades visibles a la vez

    const totalItems = properties.length;
    const maxScrollIndex = totalItems - itemsPerView;

    const nextProperties = () => {
        if (scrollIndex < maxScrollIndex) {
            setScrollIndex(scrollIndex + 1);
        }
    };

    const prevProperties = () => {
        if (scrollIndex > 0) {
            setScrollIndex(scrollIndex - 1);
        }
    };

    return (
        <div className="flex items-center justify-between w-full px-4 space-x-4">
            {/* Botón Anterior: Deshabilitado si estamos en el inicio */}
            <button 
                onClick={prevProperties} 
                disabled={scrollIndex === 0}
                className={`p-2 rounded-full transition-colors ${scrollIndex === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark'}`}
            >
                <FaArrowLeft className="w-6 h-6" />
            </button>

            {/* Contenedor de propiedades que ocupa todo el ancho */}
            <div className="flex overflow-hidden w-full">
                <div 
                    className="flex transition-transform duration-300"
                    style={{ transform: `translateX(-${scrollIndex * (100 / itemsPerView)}%)` }}
                >
                    {properties.map((property) => (
                        <div key={property.id} className="flex-shrink-0 w-1/3 p-4"> {/* Cada propiedad ocupa un tercio del ancho */}
                            <PropertyCard 
                                property={property} 
                                onRentClick={() => console.log(`Viewing property ${property.id}`)} 
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Botón Siguiente: Deshabilitado un paso antes del final */}
            <button 
                onClick={nextProperties} 
                disabled={scrollIndex >= maxScrollIndex - 1}
                className={`p-2 rounded-full transition-colors ${scrollIndex >= maxScrollIndex - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark'}`}
            >
                <FaArrowRight className="w-6 h-6" />
            </button>
        </div>
    );
};

export default HomePropertiesCarousel;
