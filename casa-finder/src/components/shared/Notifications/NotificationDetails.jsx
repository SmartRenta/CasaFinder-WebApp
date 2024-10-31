import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { getUserRoleFromCache, setUserRoleInCache } from "../../../utils/authUtils";
import notificationsLandlord from "../../../data/notificationsLandlord.json";
import notificationsTenant from "../../../data/notificationsTenant.json";
import Welcome from "../../../pages/Welcome";
import Rating from "../../../pages/Rating";
import Contract from "../../../pages/Contract";
import ErrorPage from "../../../routers/ErrorPage.jsx";

const NotificationDetails = ({}) => {
    
    const { id } = useParams(); 
    const userRole = getUserRoleFromCache();
    const data = (userRole === "tenant" ? notificationsTenant : notificationsLandlord);
    const notification = data.find((notif) => notif.id === parseInt(id)); 
    const basePath = userRole === "tenant" ? "/tenant" : "/landlord";
    const navigate = useNavigate();
    if (!notification) {
        return <div>No se encontró información relacionada.</div>;
      }

    useEffect(() => {
        if (notification.type === 2) {
            return navigate(`${basePath}/contratos/${notification.contract_id}`); 
        }
      }, []);

    switch(notification.type){
        case 1:
            return <Welcome userRole={userRole}/>;
        case 3:
            return <Rating userRole={userRole}/>;
    }
}
export default NotificationDetails;