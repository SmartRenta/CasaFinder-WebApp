import React from "react";
import { Navbar, IconButton, Avatar, Typography } from "@material-tailwind/react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/solid"; 

const NavBar = () => {
  return (
    <Navbar className="w-full py-4 px-6 bg-gray-700 text-white flex justify-between items-center">
      <IconButton className="text-white">
         <img
          src="https://cdn-icons-png.flaticon.com/512/6717/6717248.png"
          alt="User Icon"
          className="h-6 w-6" 
        />
      </IconButton>
      <div className="flex items-center gap-4">
        <IconButton className="text-white">
          <BellIcon className="h-6 w-6" />
        </IconButton>
        <Avatar
          variant="circular"
          alt="User"
          src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
          className="rounded-full h-10 w-10"
        />
        <Typography variant="h6" className="text-white">
          John Doe
        </Typography>
      </div>
    </Navbar>
  );
};

export default NavBar;
