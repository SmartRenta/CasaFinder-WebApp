export const getUserRoleFromCache = () => {
    return localStorage.getItem("userRole") || "tenant";
  };

export const setUserRoleInCache = (role) => {
    if (role === "tenant" || role === "landlord") {
      localStorage.setItem("userRole", role);
    } else {
      console.warn("Rol inválido, debe ser 'tenant' o 'landlord'");
    }
  };