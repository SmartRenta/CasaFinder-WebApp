// ProfileLandlord.jsx

import {getUserData} from "../../services/userService.js";
import React, {useEffect, useState} from "react";
import {User} from "../../entities/User.js";

const ProfileLandlord = () => {
        const [userData, setUserData] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const fetchUserData = async () => {
                const data = await getUserData();
                setUserData(new User(
                    data.id,
                    data.name,
                    data.lastName,
                    data.description,
                    data.phone,
                    data.email,
                    data.password,
                    data.facebookUserName,
                    data.instagramUserName,
                    data.userType,
                    data.documentType,
                    data.documentNumber,
                    data.registrationDate
                ));
                setLoading(false);
            };

            fetchUserData();
        }, []);

        if (loading) {
            return <div>Loading...</div>;
        }


        return (
            <div className="profile-container">
                <header className="profile-header">
                    <div className="profile-picture">
                        <img alt="profile"/>
                    </div>
                    <div className="profile-info">
                        <h2>{userData.getFullName()}</h2>
                        <p>{userData.getRegisterDate()}</p>
                    </div>
                    <div className="profile-rating">
                        <div className="rating-star">★</div>
                        <span>5 Muy bueno</span>
                    </div>
                </header>

                <div className="profile-main">
                    {/* Descripción */}
                    <section className="profile-section">
                        <h3>Descripción <span className="edit-icon">✎</span></h3>
                        <p>{userData.description != null ? userData.description : "Añade tu descripción"}</p>
                    </section>

                    {/* Contacto */}
                    <section className="profile-contact">
                        <h3>Contacto <span className="edit-icon">✎</span></h3>
                        <ul>
                            <li>📞 {userData.phone}</li>
                            <li>✉️ {userData.email}</li>
                            <li>📘 {userData.facebookUserName != null ? userData.facebookUserName : "@fcUSN"}</li>
                            <li>📸 {userData.instagramUserName != null ? userData.instagramUserName : "@instUSN"}</li>
                        </ul>
                    </section>

                    {/* Listado de Propiedades */}
                    <section className="profile-properties">
                        <h3>Listado de propiedades</h3>
                        <div className="property-card">
                            <div className="property-image"></div>
                            <div className="property-info">
                                <h4>Condominio Pradera</h4>
                                <p>Pisos: 1 piso</p>
                                <p>Tipo: Casa</p>
                                <p>Estacionamiento: 1 vehículo</p>
                                <p>Cuartos: 6 cuartos</p>
                                <div className="property-footer">
                                    <button>Ver más fotos</button>
                                    <span>★★★★☆ S/ 25,500.00</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Calificaciones */}
                    <section className="profile-reviews">
                        <h3>Calificaciones</h3>
                        <div className="review-card">
                            <div className="reviewer-picture"></div>
                            <div className="review-details">
                                <h4>COLLEN MARIA BECERRA RICHI</h4>
                                <span>★★★★★ 15 días atrás</span>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
;

export default ProfileLandlord;
