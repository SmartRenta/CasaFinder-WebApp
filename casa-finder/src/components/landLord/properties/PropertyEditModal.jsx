import React, {useEffect, useRef, useState} from 'react';
import {FaStar, FaStarHalfAlt} from 'react-icons/fa';

const PropertyModal = ({property, onClose}) => {
    const formRef = useRef(null);

    const handleClickOutside = (e) => {
        if (formRef.current && !formRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div ref={formRef} className="bg-gray-200 rounded-lg shadow-lg max-w-4xl w-full p-6">
                {/* Modal Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">{property.title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        &#x2715;
                    </button>
                </div>

                {/* Imagen y detalles principales */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-300 w-full h-48 flex items-center justify-center">
                        <img className="w-full h-32 object-cover rounded" src={property.images[0]} alt={property.title}/>
                    </div>
                    <div className="text-gray-700">
                        <p className="text-3xl font-semibold">S/ 25,500.00</p>
                        <div className="flex items-center my-2">
                            {[...Array(4)].map((_, i) => (
                                <FaStar key={i} className="text-yellow-400"/>
                            ))}
                            <FaStarHalfAlt className="text-yellow-400"/>
                        </div>
                        <p>Pisos: {property.floors} {property.floors > 1 ? "pisos" : "piso"}</p>
                        <p>Tipo: {property.type}</p>
                        <p>Estacionamiento: {property.parking} {property.parking > 1 ? "vehiculo" : "vehiculos"}</p>
                        <p>Habitaciones: {property.rooms} {property.rooms > 1 ? "habitaciones" : "habitación"}</p>
                        <p>Baños: {property.bathrooms} {property.bathrooms > 1 ? "baños" : "baño"}</p>
                    </div>
                </div>

                {/* Descripción */}
                <div className="mt-6">
                    <h3 className="font-semibold text-xl">Descripción</h3>
                    <p className="bg-white p-3 mt-2 rounded-md shadow-md">
                        Excelente oportunidad de vivienda con acabados de estreno: piso de porcelanato,
                        baños enchapados y completos.
                    </p>
                </div>

                {/* Beneficios */}
                <div className="mt-6">
                    <h3 className="font-semibold text-xl">¿Por qué es una buena elección?</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex items-center">
                            <input type="checkbox" checked readOnly className="mr-2"/>
                            Cerca al colegio Ingenieros
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" checked readOnly className="mr-2"/>
                            Cerca a parques
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" checked readOnly className="mr-2"/>
                            Cerca al centro comercial Real Plaza
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" checked readOnly className="mr-2"/>
                            Mucha vegetación
                        </div>
                    </div>
                </div>

                {/* Incluye */}
                <div className="mt-6">
                    <h3 className="font-semibold text-xl">¿Qué incluye en el precio?</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex items-center">
                            <input type="checkbox" checked readOnly className="mr-2"/>
                            Reja protectora
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" checked readOnly className="mr-2"/>
                            Áreas verdes
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" checked readOnly className="mr-2"/>
                            Guardias vigilantes 24 horas
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" checked readOnly className="mr-2"/>
                            Pet friendly
                        </div>
                    </div>
                </div>

                {/* Botón de cierre */}
                <div className="flex justify-end mt-6">
                    <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyModal;