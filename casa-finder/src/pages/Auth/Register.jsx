import {useState} from 'react';
import {register} from '../../services/authService';
import logo from '../../assets/logo.png';


const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        documentType: '',
        documentNumber: '',
        // birthDay: '',
        // birthMonth: '',
        // birthYear: '',
        phoneNumber: '',
        email: '',
        password: '',
        userType: 'TENANT',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Campo: ${name}, Valor: ${value}`); // Verificar el cambio de valor
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    
    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("UserType seleccionado:", formData.userType);
        setError(null);
        setSuccessMessage('');
        try {
            const user = {
                name: formData.firstName,
                lastName: formData.lastName,
                documentType: formData.documentType,
                documentNumber: formData.documentNumber,
                phone: formData.phoneNumber,
                email: formData.email,
                password: formData.password,
                userType: formData.userType,
            };
            const data = await register({user});
            if (data) {
                setSuccessMessage('Usuario registrado correctamente');
                setFormData({
                    firstName: '',
                    lastName: '',
                    documentType: '',
                    documentNumber: '',
                    phoneNumber: '',
                    email: '',
                    password: '',
                    userType: 'TENANT',
                });
            } else {
                setError('Fallo en el registro');
            }
        } catch (err) {
            setError('Fallo en el registro');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-[700px]">
                <div className="flex flex-col items-center mb-6">
                    <img src={logo} alt="Logo" className="w-50 h-40 mb-4"/>
                    <h2 className="text-2xl font-bold mb-2 text-center">Crear Cuenta</h2>
                </div>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
                <form onSubmit={handleRegister}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <label className="flex flex-col">
                            <span className="text-gray-700">Nombres:</span>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded"
                                placeholder="Ingresa tus nombres"
                            />
                        </label>
                        <label className="flex flex-col">
                            <span className="text-gray-700">Apellidos:</span>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded"
                                placeholder="Ingresa tus apellidos"
                            />
                        </label>
                        <label className="flex flex-col">
                            <span className="text-gray-700">Tipo de Documento:</span>
                            <select
                                name="documentType"
                                value={formData.documentType}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded"
                            >
                                <option value="">Selecciona un tipo de documento</option>
                                <option value="DNI">DNI</option>
                                <option value="PASSPORT">Pasaporte</option>
                            </select>
                        </label>
                        <label className="flex flex-col">
                            <span className="text-gray-700">Número de Documento:</span>
                            <input
                                type="text"
                                name="documentNumber"
                                value={formData.documentNumber}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded"
                                placeholder="Ingresa tu número de documento"
                            />
                        </label>
                    </div>
                    {/*<div className="grid grid-cols-3 gap-4 mb-4">*/}
                    {/*  <label className="flex flex-col">*/}
                    {/*    <span className="text-gray-700">Día:</span>*/}
                    {/*    <input*/}
                    {/*      type="text"*/}
                    {/*      name="birthDay"*/}
                    {/*      value={formData.birthDay}*/}
                    {/*      onChange={handleChange}*/}
                    {/*      className="mt-1 p-2 border border-gray-300 rounded"*/}
                    {/*      placeholder="Día"*/}
                    {/*    />*/}
                    {/*  </label>*/}
                    {/*  <label className="flex flex-col">*/}
                    {/*    <span className="text-gray-700">Mes:</span>*/}
                    {/*    <input*/}
                    {/*      type="text"*/}
                    {/*      name="birthMonth"*/}
                    {/*      value={formData.birthMonth}*/}
                    {/*      onChange={handleChange}*/}
                    {/*      className="mt-1 p-2 border border-gray-300 rounded"*/}
                    {/*      placeholder="Mes"*/}
                    {/*    />*/}
                    {/*  </label>*/}
                    {/*  <label className="flex flex-col">*/}
                    {/*    <span className="text-gray-700">Año:</span>*/}
                    {/*    <input*/}
                    {/*      type="text"*/}
                    {/*      name="birthYear"*/}
                    {/*      value={formData.birthYear}*/}
                    {/*      onChange={handleChange}*/}
                    {/*      className="mt-1 p-2 border border-gray-300 rounded"*/}
                    {/*      placeholder="Año"*/}
                    {/*    />*/}
                    {/*  </label>*/}
                    {/*</div>*/}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <label className="flex flex-col">
                            <span className="text-gray-700">Celular:</span>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded"
                                placeholder="Ingresa tu número de celular"
                            />
                        </label>
                        <label className="flex flex-col">
                            <span className="text-gray-700">Email:</span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded"
                                placeholder="Ingresa tu correo electrónico"
                            />
                        </label>
                    </div>
                    <label className="block mb-4">
                        <span className="text-gray-700">Contraseña:</span>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            placeholder="Ingresa tu contraseña"
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700">Tipo de Usuario:</span>
                        <select
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        >
                            <option value="TENANT">Inquilino</option>
                            <option value="LANDLORD">Propietario</option>
                        </select>
                    </label>
                    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded w-full">
                        Registrarse
                    </button>
                </form>
                <p className="text-center mt-4">
                    ¿Ya tienes cuenta? <a href="/login" className="text-blue-500">Inicia Sesión</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
