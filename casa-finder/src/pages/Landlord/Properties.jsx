import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Property } from "../../entities/Property.js";
import PropertyCard from "../../components/shared/Properties/PropertyCard.jsx";
import NewPropertyButton from "../../components/landLord/properties/NewPropertyButton.jsx";
import NewPropertyForm from "../../components/landLord/properties/NewPropertyForm.jsx";
import propertiesData from "../../data/propertiesData.json"; // Importamos el JSON

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [visibleNewPropertyDialog, setVisibleNewPropertyDialog] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Convertimos los datos del JSON en instancias de Property
        const loadedProperties = propertiesData.map(propertyData => 
            new Property(
                propertyData.id,
                propertyData.title,
                propertyData.price,
                propertyData.floors,
                propertyData.type,
                propertyData.parking,
                propertyData.rooms,
                propertyData.bathrooms,
                propertyData.description,
                propertyData.features,
                propertyData.included, // Verifica el nombre correcto en el JSON
                propertyData.images,
                propertyData.contact,
                propertyData.region,
                propertyData.province,
                propertyData.district
            )
        );
        setProperties(loadedProperties);
    }, []);

    const handleNewPropertyClick = () => {
        setVisibleNewPropertyDialog(true);
    };

    const handleCloseNewPropertyDialog = () => {
        setVisibleNewPropertyDialog(false);
    };

    // Método para ver los detalles de una propiedad
    const handleViewProperty = (propertyId) => {
        navigate(`/landlord/property/${propertyId}`); // Navega a la ruta de detalles de la propiedad
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <PropertyCard 
                        key={property.id} 
                        property={property} 
                        onRentClick={() => handleViewProperty(property.id)} // Pasamos la función para ver detalles
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
