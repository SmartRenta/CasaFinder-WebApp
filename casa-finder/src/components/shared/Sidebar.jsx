import React, { useState } from "react";
import { List, Typography, Card, IconButton } from "@material-tailwind/react";
import { NavLink } from "react-router-dom"; 
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  ClipboardIcon, 
  CurrencyDollarIcon, 
  UserCircleIcon 
} from "@heroicons/react/24/solid";
import { 
  ChevronDoubleLeftIcon, 
  ChevronDoubleRightIcon, 
  Bars3Icon, 
  XMarkIcon, 
  ArrowLeftOnRectangleIcon 
} from "@heroicons/react/24/outline";

const Sidebar = ({ userRole }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Define the base path according to the user role
  const basePath = userRole === "LANDLORD" ? "/landlord" : "/tenant";

  return (
    <>
      <IconButton
        className="lg:hidden text-white m-2 fixed z-50 top-4 left-4"
        onClick={toggleVisibility}
      >
        {isVisible ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </IconButton>

      <div
        className={`fixed lg:sticky top-0 left-0 h-screen ${isExpanded ? "w-64" : "w-20"} 
        ${isVisible ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 
        duration-300 bg-primary text-white z-40 flex flex-col justify-between`}
      >
        <Card className="flex flex-col justify-between h-full w-full p-4 bg-primary transition-all duration-300 ease-in-out text-white">
          <div>
            <div className="flex justify-between items-center mb-6">
              {isExpanded && (
                <Typography variant="h6" className="ml-4 text-white text-xl">
                  {userRole === "LANDLORD" ? "Arrendador" : "Arrendatario"}
                </Typography>
              )}
              <IconButton onClick={toggleSidebar} className="text-white">
                {isExpanded ? (
                  <ChevronDoubleLeftIcon className="h-6 w-6" />
                ) : (
                  <ChevronDoubleRightIcon className="h-6 w-6" />
                )}
              </IconButton>
            </div>

            <List className="flex flex-col gap-2 text-white">
              <NavLink 
                to={`${basePath}/home`} 
                className={`flex items-center gap-4 py-3 ${isExpanded ? "pl-4" : "justify-center"} hover:bg-gray-700 rounded-lg transition-all`}
              >
                <HomeIcon className={`h-6 w-6 ${!isExpanded && "h-8 w-8"}`} />
                {isExpanded && <Typography className="text-white">Inicio</Typography>}
              </NavLink>

              {/* Routes for Landlord */}
              {userRole === "LANDLORD" && (
                <>
                  <NavLink 
                    to={`${basePath}/propiedades`} 
                    className={`flex items-center gap-4 py-3 ${isExpanded ? "pl-4" : "justify-center"} hover:bg-gray-700 rounded-lg transition-all`}
                  >
                    <BuildingOfficeIcon className={`h-6 w-6 ${!isExpanded && "h-8 w-8"}`} />
                    {isExpanded && <Typography className="text-white">Propiedades</Typography>}
                  </NavLink>

                  <NavLink 
                    to={`${basePath}/contratos`} 
                    className={`flex items-center gap-4 py-3 ${isExpanded ? "pl-4" : "justify-center"} hover:bg-gray-700 rounded-lg transition-all`}
                  >
                    <ClipboardIcon className={`h-6 w-6 ${!isExpanded && "h-8 w-8"}`} />
                    {isExpanded && <Typography className="text-white">Contratos</Typography>}
                  </NavLink>
                </>
              )}

              {/* Routes for Tenant */}
              {userRole === "TENANT" && (
                <>
                  <NavLink 
                    to={`${basePath}/contratos`} 
                    className={`flex items-center gap-4 py-3 ${isExpanded ? "pl-4" : "justify-center"} hover:bg-gray-700 rounded-lg transition-all`}
                  >
                    <ClipboardIcon className={`h-6 w-6 ${!isExpanded && "h-8 w-8"}`} />
                    {isExpanded && <Typography className="text-white">Contratos</Typography>}
                  </NavLink>

                  <NavLink 
                    to={`${basePath}/transferencias`} 
                    className={`flex items-center gap-4 py-3 ${isExpanded ? "pl-4" : "justify-center"} hover:bg-gray-700 rounded-lg transition-all`}
                  >
                    <CurrencyDollarIcon className={`h-6 w-6 ${!isExpanded && "h-8 w-8"}`} />
                    {isExpanded && <Typography className="text-white">Transferencias</Typography>}
                  </NavLink>
                </>
              )}

              {/* Shared Route for Profile */}
              <NavLink 
                to={`${basePath}/perfil`} 
                className={`flex items-center gap-4 py-3 ${isExpanded ? "pl-4" : "justify-center"} hover:bg-gray-700 rounded-lg transition-all`}
              >
                <UserCircleIcon className={`h-6 w-6 ${!isExpanded && "h-8 w-8"}`} />
                {isExpanded && <Typography className="text-white">Perfil</Typography>}
              </NavLink>
            </List>
          </div>

          <NavLink 
            to="/" 
            className={`flex items-center gap-4 py-3 ${isExpanded ? "pl-4" : "justify-center"} hover:bg-red-600 rounded-lg transition-all`}
            onClick={() => console.log("Cerrar sesión")} 
          >
            <ArrowLeftOnRectangleIcon className={`h-6 w-6 ${!isExpanded && "h-8 w-8"}`} />
            {isExpanded && <Typography className="text-white">Cerrar sesión</Typography>}
          </NavLink>
        </Card>
      </div>
    </>
  );
};

export default Sidebar;
