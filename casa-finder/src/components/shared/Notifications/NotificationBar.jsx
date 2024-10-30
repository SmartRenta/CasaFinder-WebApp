import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom"; 
//import axios from 'axios';
import NotificationCard from "./NotificationCard";
import { getUserRoleFromCache, setUserRoleInCache } from "../../../utils/authUtils";
import notificationsLandlord from "../../../data/notificationsLandlord.json";
import notificationsTenant from "../../../data/notificationsTenant.json";

const NotificationBar = ({onClose}) => {
    
    const userRole = getUserRoleFromCache();
    const data = (userRole === "tenant" ? notificationsTenant : notificationsLandlord);
    const formRef = useRef(null);
    const navigate = useNavigate();

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
    
    /*const [notificationsData, setnotificationsData] = useState('');
    useEffect(()=>{
        const fetchData =  async() =>{
            const {data} = await axios.get('/notifications.json');
            setnotificationsData(data);
        }
        fetchData();
    }, []);*/
    
    const handleMouseEnter = (e) => {
        e.currentTarget.style.background = '#4B5563'; //'#9CA3AF';
        e.currentTarget.style.cursor = 'pointer';
    }
    const handleMouseLeave = (e) => {
        e.currentTarget.style.background = '#374151';
    }
    const handleClick = (notification) => {
        onClose();
        navigate(`/notifications/${notification.id}`); 
    }

    return (
        <div className="fixed inset-y-0 right-0 mt-6 bg-opacity-50">
            <div ref={formRef} className="w-64 h-96 overflow-y-auto mt-6 bg-gray-700 text-white text-black p-4 shadow-lg border rounded">
                {data.reverse().map((notification) => (
                    <div key={notification.id} className="col-4" onClick={() => handleClick(notification)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <NotificationCard notification={notification}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NotificationBar;