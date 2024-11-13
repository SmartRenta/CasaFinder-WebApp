import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PropertyCard from "../../shared/Properties/PropertyCard.jsx";
import { useNavigate } from "react-router-dom";



const HomePropertiesCarousel = ({ properties }) => { 
    const [scrollIndex, setScrollIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);

    const totalItems = properties.length;
    const maxScrollIndex = Math.max(0, totalItems - itemsPerView); 
    const navigate = useNavigate();


    useEffect(() => {
        if (totalItems <= 1) setItemsPerView(1);
        else if (totalItems === 2) setItemsPerView(2);
        else setItemsPerView(3);
    }, [totalItems]);

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

    const handleViewProperty = (propertyId) => {
        navigate(`/landlord/property/${propertyId}`);
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
                    style={{ transform: `translateX(-${(scrollIndex * 100) / itemsPerView}%)` }}
                >
                    {properties.map((property) => (
                        <div 
                            key={property.id} 
                            className={`flex-shrink-0 p-4 ${itemsPerView === 1 ? 'w-full' : itemsPerView === 2 ? 'w-1/2' : 'w-1/3'}`}
                        >
                            <PropertyCard 
                                property={property} 
                                onRentClick={() => handleViewProperty(property.id)} 
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Botón Siguiente: Deshabilitado si estamos en el último paso */}
            <button 
                onClick={nextProperties} 
                disabled={scrollIndex >= maxScrollIndex}
                className={`p-2 rounded-full transition-colors ${scrollIndex >= maxScrollIndex ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark'}`}
            >
                <FaArrowRight className="w-6 h-6" />
            </button>
        </div>
    );
};

export default HomePropertiesCarousel;
