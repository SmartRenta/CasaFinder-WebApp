import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'tenant',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Aquí se debería manejar el registro
    console.log('Registrando usuario:', formData);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h2>
        <form onSubmit={handleRegister}>
          <label className="block mb-4">
            <span className="text-gray-700">Nombre:</span>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Apellido:</span>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Email:</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Contraseña:</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Tipo de Usuario:</span>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="tenant">Inquilino</option>
              <option value="landlord">Propietario</option>
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
