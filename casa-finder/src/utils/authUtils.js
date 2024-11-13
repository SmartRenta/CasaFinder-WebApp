export const getUserRoleFromCache = () => {
    return localStorage.getItem("userRole") || "TENANT";
};

export const setUserRoleInCache = (role) => {
    if (role === "TENANT" || role === "LANDLORD") {
        localStorage.setItem("userRole", role);
    } else {
        console.warn("Rol inválido, debe ser 'TENANT' o 'LANDLORD'");
    }
};

export const setTokenInCache = (token) => {
    localStorage.setItem("token", token);
}

export const getTokenFromCache = () => {
    return localStorage.getItem("token");
}

export const clearCache = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
}
