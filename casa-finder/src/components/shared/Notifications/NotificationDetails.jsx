import React from 'react';
import { useParams, useNavigate } from "react-router-dom"; 
import { getUserRoleFromCache, setUserRoleInCache } from "../../../utils/authUtils";
import notificationsLandlord from "../../../data/notificationsLandlord.json";
import notificationsTenant from "../../../data/notificationsTenant.json";
import Welcome from "../../../pages/Welcome";
import Rating from "../../../pages/Rating";
import Contract from "../../../pages/Contract";

const NotificationDetails = ({}) => {
    
    const { id } = useParams(); 
    const userRole = getUserRoleFromCache();
    const data = (userRole === "tenant" ? notificationsTenant : notificationsLandlord);
    const notification = data.find((notif) => notif.id === parseInt(id)); 

    switch(notification.type){
        case 1:
            return <Welcome userRole={userRole}/>;
        case 2:
            return <Contract userRole={userRole}/>;
        case 3:
            return <Rating userRole={userRole}/>;
        default:
            return <ErrorPage userRole={userRole}/>;
    }
}
export default NotificationDetails;