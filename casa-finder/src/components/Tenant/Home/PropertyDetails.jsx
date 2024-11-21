import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PropertyService from "../../../services/propertyService";
import { getUserRoleFromCache } from "../../../utils/authUtils";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      const propertyData = await PropertyService.getPropertyById(id);
      setProperty(propertyData);
    };

    const fetchUserRole = () => {
      const role = getUserRoleFromCache(); // Obtiene el rol del usuario desde el caché
      setUserRole(role);
    };

    fetchProperty();
    fetchUserRole();
  }, [id]);

  if (!property) {
    return <div>Cargando propiedad...</div>;
  }

  const handleBack = () => {
    navigate(-1); // Navegar a la página anterior
  };

  const goToCreateContract = () => {
    navigate(`/tenant/contratos/${property.id}/${property.landlord.id}`);
  };

  return (
    <div className="p-8 bg-gray-100">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 w-full">
          <h2 className="text-3xl font-bold mb-4">{property.title}</h2>
          
          <div className="text-lg mb-6 space-y-2">
            <p className="text-2xl font-semibold text-primary">
              {property.currency} {property.price}
            </p>
            
            <p className="text-gray-700">{property.floors} {property.floors === 1 ? 'Piso' : 'Pisos'}</p>
            <p className="text-gray-700">Tipo: {property.type}</p>
            <p className="text-gray-700">
              Estacionamiento: {property.parking} {property.parking === 1 ? 'Vehículo' : 'Vehículos'}
            </p>
            <p className="text-gray-700">
              Cuartos: {property.rooms} {property.rooms === 1 ? 'Cuarto' : 'Cuartos'}
            </p>
            <p className="text-gray-700">
              Baños: {property.bathrooms} {property.bathrooms === 1 ? 'Baño' : 'Baños'}
            </p>
            <p className="text-gray-700 mt-2">Dirección: {property.address}</p>
          </div>

          <div className="mt-4">
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              className="h-96"
              containerClass="carousel-container"
              draggable
              infinite
              responsive={{
                desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
                tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
                mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
              }}
              showDots
              slidesToSlide={1}
              swipeable
            >
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Property image ${index + 1}`}
                  className="w-full h-96 object-cover rounded-lg"
                />
              ))}
            </Carousel>
          </div>
        </div>

        <div className="lg:w-1/2 w-full">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Descripción</h3>
            <p className="mt-2 text-gray-700">{property.description}</p>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">¿Por qué es una buena elección?</h4>
              <ul className="list-none space-y-1">
                {property.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">✅ {feature}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">¿Qué incluye el precio?</h4>
              <ul className="list-none space-y-1">
                {property.includes.map((item, index) => (
                  <li key={index} className="text-gray-600">✅ {item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Calificaciones</h4>
              <p className="text-yellow-500">⭐ 4.5 basado en 15 reseñas</p>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Contacto</h4>
              <p className="text-gray-800 font-semibold">{property.landlord.name} {property.landlord.lastName}</p>
              <p>
                <a href={`mailto:${property.landlord.email}`} className="text-primary hover:underline">
                  {property.landlord.email}
                </a>
              </p>
            </div>

            <div className="mt-6 flex justify-between">
              {userRole === "TENANT" && (
                <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark"
                  onClick={goToCreateContract}
                >
                  Alquilar casa
                </button>
              )}

              <button
                onClick={handleBack}
                className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
