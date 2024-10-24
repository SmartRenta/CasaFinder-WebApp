import React, {useState, useEffect, useRef} from "react";

const NewPropertyForm = ({onClose}) => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        description: "",
        price: "",
        currency: "USD",
        floors: "",
        type: "",
        parking: "",
        rooms: "",
        image: "",
        bathrooms: "",
        reason: "",
        includes: "",
        acceptTerms: false,
    });

    const formRef = useRef(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
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
                        <label className="block text-gray-700">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Dirección</label>
                        <input
                            type="text"
                            name="direccion"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Descripción</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
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
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-20 px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="flex justify-between gap-8 w-full mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-4">
                                <label className="text-gray-700 w-32">Tipo</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="flex-1 px-3 py-2 border rounded"
                                >
                                    <option value="Casa">Casa</option>
                                    <option value="Condominio">Condominio</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-64">
                            <div className="flex items-center gap-4">
                                <label className="text-gray-700 w-32">País</label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="flex-1 px-3 py-2 border rounded"
                                >
                                    <option value="Perú">Perú</option>
                                    <option value="México">México</option>
                                    <option value="Argentina">Argentina</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between gap-8 w-full mb-4">
                        <div className="flex-1">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <label className="text-gray-700 w-32">Pisos</label>
                                    <input
                                        type="number"
                                        name="floors"
                                        value={formData.floors}
                                        onChange={handleChange}
                                        className="flex-1 px-3 py-2 border rounded"
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <label className="text-gray-700 w-32">Estacionamiento(s)</label>
                                    <input
                                        type="number"
                                        name="parking"
                                        value={formData.parking}
                                        onChange={handleChange}
                                        className="flex-1 px-3 py-2 border rounded"
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <label className="text-gray-700 w-32">Habitaciones</label>
                                    <input
                                        type="number"
                                        name="rooms"
                                        value={formData.rooms}
                                        onChange={handleChange}
                                        className="flex-1 px-3 py-2 border rounded"
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <label className="text-gray-700 w-32">Baños</label>
                                    <input
                                        type="number"
                                        name="bathrooms"
                                        value={formData.bathrooms}
                                        onChange={handleChange}
                                        className="flex-1 px-3 py-2 border rounded"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-64 flex items-center">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center w-full">
                                <label className="block">
                                    <span className="text-gray-700">Adjuntar fotos</span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => console.log(e.target.files)}
                                    />
                                    <div className="mt-2 flex items-center justify-center">
                                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                            Seleccionar archivos
                                        </button>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Por qué es una buena elección?</label>
                        <textarea
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Qué incluye el precio?</label>
                        <textarea
                            name="includes"
                            value={formData.includes}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        ></textarea>
                    </div>
                    <div className="mb-4 w-full text-center">
                        <label className="block text-gray-700">
                            <input
                                type="checkbox"
                                name="acceptTerms"
                                checked={formData.acceptTerms}
                                onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
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
                            className="px-4 py-2 bg-blue-500 text-white rounded"
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