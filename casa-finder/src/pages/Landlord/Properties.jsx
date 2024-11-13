import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropertyService from "../../services/propertyService";
import PropertyCard from "../../components/shared/Properties/PropertyCard.jsx";
import NewPropertyButton from "../../components/landLord/properties/NewPropertyButton.jsx";
import NewPropertyForm from "../../components/landLord/properties/NewPropertyForm.jsx";
import { getUserIdFromCache } from "../../utils/authUtils.js";

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [visibleNewPropertyDialog, setVisibleNewPropertyDialog] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProperties = async () => {
            const landlordId = getUserIdFromCache(); // Obtener landlordId del caché
            if (landlordId) {
                const loadedProperties = await PropertyService.getPropertiesByLandlord(landlordId);
                setProperties(loadedProperties);
            }
        };

        fetchProperties();
    }, []);

    const handleNewPropertyClick = () => {
        setVisibleNewPropertyDialog(true);
    };

    const handleCloseNewPropertyDialog = () => {
        setVisibleNewPropertyDialog(false);
    };

    const handleViewProperty = (propertyId) => {
        navigate(`/landlord/property/${propertyId}`);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <PropertyCard 
                        key={property.id} 
                        property={property} 
                        onRentClick={() => handleViewProperty(property.id)}
                    />
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <NewPropertyButton onClick={handleNewPropertyClick} />
            </div>
            {visibleNewPropertyDialog && <NewPropertyForm onClose={handleCloseNewPropertyDialog} />}
        </div>
    );
};

export default Properties;
