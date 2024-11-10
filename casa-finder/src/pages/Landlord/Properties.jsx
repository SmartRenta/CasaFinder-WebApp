import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Property } from "../../entities/Property.js"; // Asegúrate de que esta entidad esté definida correctamente
import PropertyCard from "../../components/shared/Properties/PropertyCard.jsx";
import NewPropertyButton from "../../components/landLord/properties/NewPropertyButton.jsx";
import NewPropertyForm from "../../components/landLord/properties/NewPropertyForm.jsx";
import propertiesData from "../../data/propertiesData.json"; // Importamos el JSON con los datos de propiedades

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [visibleNewPropertyDialog, setVisibleNewPropertyDialog] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Convertimos los datos del JSON en instancias de Property, asegurándonos que los campos coincidan con el JSON
        const loadedProperties = propertiesData.map(propertyData => 
            new Property(
                propertyData.id,
                propertyData.title,
                propertyData.price,
                propertyData.currency, // Agregado el campo currency
                propertyData.timePeriod, // Agregado el campo timePeriod
                propertyData.floors,
                propertyData.type,
                propertyData.parking,
                propertyData.rooms,
                propertyData.bathrooms,
                propertyData.description,
                propertyData.features,
                propertyData.includes, // Asegúrate de que el JSON tenga el campo `includes`
                propertyData.images,
                propertyData.contact,
                propertyData.region,
                propertyData.province,
                propertyData.district,
                propertyData.address // Agregado el campo address
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

    // Método para ver los detalles de una propiedad, usando `navigate` para cambiar de ruta
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