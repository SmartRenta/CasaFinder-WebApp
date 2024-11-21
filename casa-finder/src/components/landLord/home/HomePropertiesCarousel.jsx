import React from "react";
import PropertyCard from "../../shared/Properties/PropertyCard.jsx";
import { useNavigate } from "react-router-dom";

const HomePropertiesCarousel = ({ properties }) => {
    const navigate = useNavigate();

    const handleViewProperty = (propertyId) => {
        navigate(`/landlord/property/${propertyId}`);
    };

    return (
        <div className="w-full">
            {/* Contenedor de propiedades con scroll horizontal si hay más de 5 */}
            <div
                className={`flex ${
                    properties.length > 5 ? "overflow-x-auto scrollbar-hide" : "flex-wrap"
                } gap-4 pb-4`}
            >
                {properties.map((property) => (
                    <div
                        key={property.id}
                        className="shrink-0 w-74 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                        <PropertyCard
                            property={property}
                            onRentClick={() => handleViewProperty(property.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePropertiesCarousel;
