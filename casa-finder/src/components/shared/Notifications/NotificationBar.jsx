import React, {useEffect, useRef, useState} from "react";
import axios from 'axios';
import NotificationCard from "./NotificationCard";
//import data from './././data/notifications.json';

const NotificationBar = ({onClose}) => {
    
    const formRef = useRef(null);
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

    const [notificationsData, setnotificationsData] = useState('');
    useEffect(()=>{
        const fetchData =  async() =>{
            const {data} = await axios.get('notifications.json');
            setnotificationsData(data);
        }
        fetchData();
    }, []);
    
    const handleMouseEnter = (e) => {
        e.currentTarget.style.background = '#4B5563'; //'#9CA3AF';
        e.currentTarget.style.cursor = 'pointer';
    }
    const handleMouseLeave = (e) => {
        e.currentTarget.style.background = '#374151';
    }
    const handleClick = (e) => {
        console.log("click");
    }

    //inset-0 flex items-center justify-center   bg-gray-800 
    return (
        <div className="fixed inset-y-0 right-0 mt-6 bg-opacity-50">
            <div
                ref={formRef}
                className="w-64 h-96 overflow-y-auto mt-6 bg-gray-700 text-white text-black p-4 shadow-lg border rounded"
            >
                {Object.keys(notificationsData).reverse().map((notification) => (
                    <div className="col-4" onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <NotificationCard notification={notificationsData[notification]}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NotificationBar;