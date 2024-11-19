import React from 'react';
import {FaCheckCircle} from "react-icons/fa";

const NotificationCard = ({notification}) => {
    return (
        <div className="notificacion flex border-b pt-1 pb-2">
            <div className="w-1/5" >
                {notification.read ?
                <span className="check read"><FaCheckCircle className="text-green-500"/></span>
                :
                <span className="check unread"><FaCheckCircle className="text-gray-500"/></span>
                }
            </div>
            <div className="w-4/5 ">
                <div className="date">{new Date(notification.creationDate).toLocaleString('es-ES').replace(",","")}</div>
                <div className="description">{notification.content}</div>
            </div>
        </div>
    );
}

export default NotificationCard;