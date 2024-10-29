import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUserRoleInCache } from '../../utils/authUtils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Lógica de autenticación simple
    if (email === 'tenant@example.com' && password === 'password') {
      setUserRoleInCache('tenant');
      navigate('/tenant/perfil'); // Redirige al perfil del tenant
    } else if (email === 'landlord@example.com' && password === 'password') {
      setUserRoleInCache('landlord');
      navigate('/landlord/perfil'); // Redirige al perfil del landlord
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            Error al iniciar sesión: Tu contraseña o usuario son incorrectos. Inténtalo nuevamente.
          </div>
        )}
        <form onSubmit={handleLogin}>
          <label className="block mb-4">
            <span className="text-gray-700">Email:</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Contraseña:</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
            Iniciar Sesión
          </button>
        </form>
        <p className="text-center mt-4">
          ¿No tienes cuenta? <a href="/register" className="text-blue-500">Regístrate</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
