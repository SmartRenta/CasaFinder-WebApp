import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationCard from "./NotificationCard";
import { getUserRoleFromCache, getUserIdFromCache} from "../../../utils/authUtils";
import notificationsLandlord from "../../../data/notificationsLandlord.json";
import notificationsTenant from "../../../data/notificationsTenant.json";
import notificationService from "../../../services/notificationService";

const NotificationBar = ({ onClose }) => {
    //const userRole = getUserRoleFromCache();
    //const data = (userRole === "TENANT" ? notificationsTenant : notificationsLandlord);
    const formRef = useRef(null);
    const navigate = useNavigate();

    const [notificationData, setNotificationData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {

            const id = getUserIdFromCache();
            const data = await notificationService.getAllNotifications(id);
            setNotificationData(data.sort( (a,b) => new Date(b.creationDate) - new Date(a.creationDate)));
        }
        fetchData();
    }, []);

    const handleClickOutside = (e) => {
        if (formRef.current && !formRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMouseEnter = (e) => {
        e.currentTarget.style.background = '#4B5563';
        e.currentTarget.style.cursor = 'pointer';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.background = '#374151';
    };

    const handleClick = async (notification) => {

        onClose();
        if(!notification.read){
            const done = await notificationService.markAsRead(notification.id);
            if(done){
                notification.read = true;
            }
        }
        console.table(notification);
        console.log(notification.route);
        navigate(notification.route);
    };

    return (
        <div className="fixed z-50 inset-y-0 right-0 mt-6 bg-opacity-50">
            <div ref={formRef} className="w-64 h-96 overflow-y-auto mt-6 bg-gray-700 text-white text-black p-4 shadow-lg border rounded">
            { notificationData.length === 0 ?
                (<div>No hay ninguna notificación por el momento</div>)
                :
                (notificationData.map((notification) => (
                    <div 
                        key={notification.id} 
                        className="col-4" 
                        onClick={() => handleClick(notification)} 
                        onMouseEnter={handleMouseEnter} 
                        onMouseLeave={handleMouseLeave}
                    >
                        <NotificationCard notification={notification} />
                    </div>
                )))
                }
            </div>
        </div>
    );
};

export default NotificationBar;
