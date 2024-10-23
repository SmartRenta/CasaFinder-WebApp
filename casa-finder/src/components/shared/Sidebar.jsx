import React, { useState } from "react";
import { List, ListItem, Typography, Card, IconButton } from "@material-tailwind/react";
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
  XMarkIcon 
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isVisible, setIsVisible] = useState(false); 
  const [selectedItem, setSelectedItem] = useState("Inicio");

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <IconButton
        className="lg:hidden text-white m-2 fixed z-50 top-4 left-4" // Solo visible en pantallas pequeñas, botón de hamburguesa
        onClick={toggleVisibility}
      >
        {isVisible ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </IconButton>

      <div
        className={`fixed lg:relative top-0 left-0 h-screen ${isExpanded ? "w-64" : "w-20"} 
        ${isVisible ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 
        duration-300 bg-primary text-white z-40 flex flex-col justify-between`}
      >
        <Card className="flex flex-col justify-between h-full w-full p-4 bg-primary transition-all duration-300 ease-in-out">
          <div>
            <div className="flex justify-between items-center mb-6">
              {isExpanded && (
                <Typography variant="h6" className="ml-4 text-white text-xl">
                  {selectedItem}
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

            <List className="flex flex-col gap-2">
              <NavLink to="/" className="flex items-center gap-4 py-3 pl-4 hover:bg-gray-700 rounded-lg transition-all" onClick={() => setSelectedItem("Inicio")}>
                <HomeIcon className="h-6 w-6" />
                {isExpanded && <Typography>Inicio</Typography>}
              </NavLink>

              <NavLink to="/propiedades" className="flex items-center gap-4 py-3 pl-4 hover:bg-gray-700 rounded-lg transition-all" onClick={() => setSelectedItem("Propiedades")}>
                <BuildingOfficeIcon className="h-6 w-6" />
                {isExpanded && <Typography>Propiedades</Typography>}
              </NavLink>

              <NavLink to="/contratos" className="flex items-center gap-4 py-3 pl-4 hover:bg-gray-700 rounded-lg transition-all" onClick={() => setSelectedItem("Contratos")}>
                <ClipboardIcon className="h-6 w-6" />
                {isExpanded && <Typography>Contratos</Typography>}
              </NavLink>

              <NavLink to="/transferencias" className="flex items-center gap-4 py-3 pl-4 hover:bg-gray-700 rounded-lg transition-all" onClick={() => setSelectedItem("Transferencias")}>
                <CurrencyDollarIcon className="h-6 w-6" />
                {isExpanded && <Typography>Transferencias</Typography>}
              </NavLink>

              <NavLink to="/perfil" className="flex items-center gap-4 py-3 pl-4 hover:bg-gray-700 rounded-lg transition-all" onClick={() => setSelectedItem("Perfil")}>
                <UserCircleIcon className="h-6 w-6" />
                {isExpanded && <Typography>Perfil</Typography>}
              </NavLink>
            </List>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Sidebar;
