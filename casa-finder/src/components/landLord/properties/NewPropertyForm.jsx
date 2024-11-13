import React, { useState, useEffect, useRef } from "react";
import PropertyService from "../../../services/propertyService";
import { getUserIdFromCache } from "../../../utils/authUtils";
import locationsData from "../../../data/locations.json";  

const NewPropertyForm = ({ onClose }) => {
    
    const [regionsData, setRegionsData] = useState([]);

    useEffect(() => {
        setRegionsData(locationsData); 
    }, []);
    


    const [formData, setFormData] = useState({
        id: "",
        title: "",
        description: "",
        price: "",
        currency: "USD",
        timePeriod: "1",
        floors: "",
        type: "",
        parking: "",
        rooms: "",
        bathrooms: "",
        features: [""],
        includes: [""],
        images: [""],
        region: "",
        province: "",
        district: "",
        address: "",
        acceptTerms: false,
    });

    const [filteredProvinces, setFilteredProvinces] = useState([]);
    const [filteredDistricts, setFilteredDistricts] = useState([]);

    const formRef = useRef(null);

    const isFormComplete = () => {
        const requiredFields = [
            'title', 'description', 'price', 'currency', 'timePeriod', 'floors', 
            'type', 'parking', 'rooms', 'bathrooms', 'region', 'province', 
            'district', 'address'
        ];
        
        for (const field of requiredFields) {
            if (!formData[field]) {
                return false;
            }
        }
        
        const arrayFields = ['features', 'includes', 'images'];
        for (const arrayField of arrayFields) {
            if (formData[arrayField].length === 0 || formData[arrayField][0] === "") {
                return false;
            }
        }
    
        return formData.acceptTerms;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "region") {
            const selectedRegion = regionsData.find(region => region.region === value);
            setFilteredProvinces(selectedRegion ? selectedRegion.provincias : []);
            setFilteredDistricts([]);
            setFormData(prev => ({ ...prev, province: "", district: "" }));
        }

        if (name === "province") {
            const selectedProvince = filteredProvinces.find(province => province.provincia === value);
            setFilteredDistricts(selectedProvince ? selectedProvince.distritos : []);
            setFormData(prev => ({ ...prev, district: "" }));
        }
    };

    const handleArrayChange = (index, value, field) => {
        const updatedArray = [...formData[field]];
        updatedArray[index] = value;
        setFormData({ ...formData, [field]: updatedArray });
    };

    const addArrayField = (field) => {
        if (formData[field].length === 0) {
            setFormData({ ...formData, [field]: [""] });
        } else {
            setFormData({ ...formData, [field]: [...formData[field], ""] });
        }
    };

    const removeArrayField = (field, index) => {
        const updatedArray = formData[field].filter((_, i) => i !== index);
        setFormData({ ...formData, [field]: updatedArray });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const landlordId = getUserIdFromCache();  
    
        const propertyData = {
            title: formData.title,
            description: formData.description,
            price: parseFloat(formData.price),
            currency: formData.currency,
            timePeriod: parseInt(formData.timePeriod),
            floors: parseInt(formData.floors),
            type: formData.type,
            parking: parseInt(formData.parking),
            rooms: parseInt(formData.rooms),
            bathrooms: parseInt(formData.bathrooms),
            features: formData.features,
            includes: formData.includes,
            images: formData.images,
            region: formData.region,
            province: formData.province,
            district: formData.district,
            address: formData.address,
            landlord: {
                id: landlordId,
                name: "string",  
                lastName: "string",  
                description: "string",  
                phone: 0, 
                registrationDate: "", 
                email: "string", 
                facebookUserName: "string",  
                instagramUserName: "string", 
                password: "string",  
                userType: "LANDLORD", 
                documentType: "DNI", 
                documentNumber: 0 
            }  
        };
    
        try {
            const response = await PropertyService.createProperty(propertyData);
            if (response) {
                console.log("Propiedad creada:", response);
                onClose(); 
            } else {
                console.error("Error al crear la propiedad.");
            }
        } catch (error) {
            console.error("Error en la creación de la propiedad:", error);
        }
    };
    

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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div
                ref={formRef}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-full overflow-y-auto"
            >
                <h2 className="text-2xl font-bold mb-4">Nueva Propiedad</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Título</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        ></textarea>
                    </div>

                    <div className="flex w-full mb-4">
                        <label className="text-gray-700 mr-2 w-32">Precio</label>
                        <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            className="px-3 py-2 border rounded mr-2"
                        >
                            <option value="USD">$</option>
                            <option value="PEN">S/.</option>
                        </select>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-20 px-3 py-2 border rounded mr-2"
                        />
                        <select
                            name="timePeriod"
                            value={formData.timePeriod}
                            onChange={handleChange}
                            className="px-3 py-2 border rounded"
                        >
                            {[...Array(6)].map((_, i) => (
                                <option key={i} value={i + 1}>{i + 1} mes</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Pisos</label>
                        <input
                            type="number"
                            name="floors"
                            value={formData.floors}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Tipo</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="">Seleccionar tipo</option>
                            <option value="Casa">Casa</option>
                            <option value="Casa de Playa">Casa de Playa</option>
                            <option value="Casa de Campo">Casa de Campo</option>
                            <option value="Condominio">Condominio</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Estacionamiento(s)</label>
                        <input
                            type="number"
                            name="parking"
                            value={formData.parking}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Habitaciones</label>
                        <input
                            type="number"
                            name="rooms"
                            value={formData.rooms}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Baños</label>
                        <input
                            type="number"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    {/* Características dinámicas */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Características</label>
                        {formData.features.map((feature, index) => (
                            <div key={index} className="flex items-center mt-2">
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => handleArrayChange(index, e.target.value, "features")}
                                    className="w-full px-3 py-2 border rounded"
                                />
                                {formData.features.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayField("features", index)}
                                        className="ml-2 text-red-500"
                                    >
                                        Eliminar
                                    </button>
                                )}
                            </div>
                        ))}
                        {formData.features[0] && (
                            <button
                                type="button"
                                onClick={() => addArrayField("features")}
                                className="text-blue-500 mt-2"
                            >
                                Agregar característica
                            </button>
                        )}
                    </div>

                    {/* Campos de incluye dinámico */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Incluye</label>
                        {formData.includes.map((include, index) => (
                            <div key={index} className="flex items-center mt-2">
                                <input
                                    type="text"
                                    value={include}
                                    onChange={(e) => handleArrayChange(index, e.target.value, "includes")}
                                    className="w-full px-3 py-2 border rounded"
                                />
                                {formData.includes.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayField("includes", index)}
                                        className="ml-2 text-red-500"
                                    >
                                        Eliminar
                                    </button>
                                )}
                            </div>
                        ))}
                        {formData.includes[0] && (
                            <button
                                type="button"
                                onClick={() => addArrayField("includes")}
                                className="text-blue-500 mt-2"
                            >
                                Agregar incluye
                            </button>
                        )}
                    </div>

                    {/* Imágenes dinámicas */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Imágenes</label>
                        {formData.images.map((image, index) => (
                            <div key={index} className="flex items-center mt-2">
                                <input
                                    type="text"
                                    value={image}
                                    onChange={(e) => handleArrayChange(index, e.target.value, "images")}
                                    className="w-full px-3 py-2 border rounded"
                                />
                                {formData.images.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayField("images", index)}
                                        className="ml-2 text-red-500"
                                    >
                                        Eliminar
                                    </button>
                                )}
                            </div>
                        ))}
                        {formData.images[0] && (
                            <button
                                type="button"
                                onClick={() => addArrayField("images")}
                                className="text-blue-500 mt-2"
                            >
                                Agregar imagen
                            </button>
                        )}
                    </div>

                    {/* Campos de ubicación */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Región</label>
                        <select
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="">Seleccionar región</option>
                            {regionsData.map((region, index) => (
                                <option key={index} value={region.region}>{region.region}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Provincia</label>
                        <select
                            name="province"
                            value={formData.province}
                            onChange={handleChange}
                            disabled={!formData.region}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="">Seleccionar provincia</option>
                            {filteredProvinces.map((province, index) => (
                                <option key={index} value={province.provincia}>{province.provincia}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Distrito</label>
                        <select
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            disabled={!formData.province}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="">Seleccionar distrito</option>
                            {filteredDistricts.map((district, index) => (
                                <option key={index} value={district}>{district}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Dirección</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    {/* Términos y botón de guardar */}
                    <div className="mb-4 w-full text-center">
                        <label className="block text-gray-700">
                            <input
                                type="checkbox"
                                name="acceptTerms"
                                checked={formData.acceptTerms}
                                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                                className="mr-2"
                            />
                            Aseguro que todos los datos ingresados son verídicos.
                        </label>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-4 px-4 py-2 bg-gray-500 text-white rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={!isFormComplete()}
                            className={`px-4 py-2 rounded ${isFormComplete() ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPropertyForm;
