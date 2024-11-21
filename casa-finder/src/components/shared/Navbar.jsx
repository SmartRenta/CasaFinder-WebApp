import React, {useEffect, useRef, useState}  from "react";
import { Navbar, IconButton, Avatar, Typography } from "@material-tailwind/react";
import { BellIcon } from "@heroicons/react/24/solid"; 
import NotificationBar from "./Notifications/NotificationBar"
import { getUserData } from "../../services/userService";

const NavBar = () => {

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUserData(data);
    }
    fetchUserData();
  }, []);

  const [visibleNotificationBar, setVisibleNotificationBar] = useState(false);
  const handleOpenNotificationBar = () => {
    setVisibleNotificationBar(true);
  }
  const handleCloseNotificationBar = () => {
    setVisibleNotificationBar(false);
  }

  return (
    <div>
      <Navbar className="w-full py-4 px-6 bg-gray-700 text-white flex justify-between items-center border-0">
        <IconButton className="text-white flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6717/6717248.png"
            alt="User Icon"
            className="h-6 w-6" 
          />
        </IconButton>
        <div className="flex items-center gap-4">
          <IconButton className="text-white flex items-center" onClick={handleOpenNotificationBar}>
            <BellIcon className="h-6 w-6" />
          </IconButton>
          <Avatar
            variant="circular"
            alt="User"
            src={userData.imageUrl}
            className="rounded-full h-10 w-10"
          />
          <Typography variant="h6" className="text-white">
          {userData.name} {userData.lastName}
          </Typography>
        </div>
      </Navbar>
      
      {visibleNotificationBar && <NotificationBar onClose={handleCloseNotificationBar}/>}
    </div>
  );
};

export default NavBar;
