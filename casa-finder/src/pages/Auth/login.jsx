import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setTokenInCache, setUserRoleInCache, clearCache, setUserIdInCache } from "../../utils/authUtils";
import logo from "../../assets/logo.png"; 
import { login } from "../../services/authService.js";
import { getUserData } from "../../services/userService.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await login(email, password);
            if (response) {
                setUserRoleInCache(response.userType); 
                setTokenInCache(response.token);       

                const userData = await getUserData(); 
                if (userData && userData.id) {
                    setUserIdInCache(userData.id); 
                }

                if (response.userType === "TENANT") {
                    navigate("/tenant/home");
                } else {
                    navigate("/landlord/home");
                }
            }
        } catch (e) {
            console.error(e);
            setError(true);
        }
    };

    const handleLogout = () => {
        clearCache();
        navigate("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <div className="flex justify-center mb-4">
                    <img src={logo} alt="Logo" className="w-20 h-20"/>
                </div>
                <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4 flex items-center">
                        <span>Error al iniciar sesión: Tu contraseña o usuario son incorrectos. Inténtalo nuevamente.</span>
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
                            placeholder="Ingresa tu correo electrónico"
                        />
                    </label>
                    <label className="block mb-4 relative">
                        <span className="text-gray-700">Contraseña:</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            placeholder="Ingresa tu contraseña"
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded w-full mt-4 hover:bg-blue-600 transition duration-300"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <p className="text-center mt-4">
                    ¿No tienes cuenta?{" "}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Regístrate
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
