import React, {useEffect, useState} from "react";
import './ProfileTenant.css';
import {getUserData, updateUserData} from "../../services/userService.js";
import {User} from "../../entities/User.js";

const ProfileTenant = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [isEditingContact, setIsEditingContact] = useState(false);
    const [isEditingPicture, setIsEditingPicture] = useState(false);
    const [description, setDescription] = useState("");
    const [contact, setContact] = useState({
        phone: "",
        email: "",
        facebookUserName: "",
        instagramUserName: ""
    });
    const [profilePicture, setProfilePicture] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getUserData();
            const user = new User(
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
                data.registrationDate,
                data.imageUrl
            );
            setUserData(user);
            setDescription(user.description);
            setContact({
                phone: user.phone,
                email: user.email,
                facebookUserName: user.facebookUserName,
                instagramUserName: user.instagramUserName
            });
            setProfilePicture(user.imageUrl);
            setLoading(false);
        };

        fetchUserData();
    }, []);

    const handleEditToggleDescription = () => {
        setIsEditingDescription(!isEditingDescription);
    };

    const handleEditToggleContact = () => {
        setIsEditingContact(!isEditingContact);
    };

    const handleEditTogglePicture = () => {
        setIsEditingPicture(!isEditingPicture);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleContactChange = (e) => {
        const {name, value} = e.target;
        setContact((prevContact) => ({
            ...prevContact,
            [name]: value
        }));
    };

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.value);
    };

    const handleSaveDescription = () => {
        if (userData) {
            userData.description = description;
            updateUserData(userData);
        }
        setIsEditingDescription(false);
    };

    const handleSaveContact = () => {
        if (userData) {
            userData.phone = contact.phone;
            userData.email = contact.email;
            userData.facebookUserName = contact.facebookUserName;
            userData.instagramUserName = contact.instagramUserName;
            updateUserData(userData);
        }
        setIsEditingContact(false);
    };

    const handleSaveProfilePicture = () => {
        if (userData) {
            userData.imageUrl = profilePicture;
            updateUserData(userData);
        }
        setIsEditingPicture(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <header className="profile-header">
                <div className="profile-picture-wrapper">
                    {isEditingPicture ? (
                        <div>
                            <input
                                type="text"
                                value={profilePicture}
                                onChange={handleProfilePictureChange}
                                placeholder="URL de la imagen"
                                className="mt-1 p-2 border border-gray-300 rounded w-full long-input"
                            />
                            <button onClick={handleSaveProfilePicture}
                                    className="bg-green-500 text-white py-2 px-4 rounded mt-2">Guardar
                            </button>
                        </div>
                    ) : (
                        <img src={profilePicture} alt="profile" className="profile-picture"/>
                    )}
                    <span className="edit-icon-profile" onClick={handleEditTogglePicture}>✎</span>
                </div>
                <div className="profile-info">
                    <h2>{userData.getFullName()}</h2>
                    <p>{userData.getRegisterDate()}</p>
                </div>
                <div className="profile-rating">
                    <div className="rating-star">★</div>
                    <span>4 Bueno</span>
                </div>
            </header>

            <div className="profile-main">


                <section className="profile-section">
                    <h3>Descripción <span className="cursor-pointer float-right"
                                          onClick={handleEditToggleDescription}>✎</span></h3>
                    {isEditingDescription ? (
                        <div>
                            <textarea
                                value={description}
                                onChange={handleDescriptionChange}
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                            />
                            <button onClick={handleSaveDescription}
                                    className="bg-green-500 text-white py-2 px-4 rounded mt-2">Guardar
                            </button>
                        </div>
                    ) : (
                        <p>{description || "Añade tu descripción"}</p>
                    )}
                </section>

                <section className="profile-contact">
                    <h3>Contacto <span className="cursor-pointer float-right"
                                       onClick={handleEditToggleContact}>✎</span></h3>
                    {isEditingContact ? (
                        <div>
                            <input
                                type="text"
                                name="phone"
                                value={contact.phone}
                                onChange={handleContactChange}
                                placeholder="Teléfono"
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                            />
                            <input
                                type="email"
                                name="email"
                                value={contact.email}
                                onChange={handleContactChange}
                                placeholder="Email"
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                            />
                            <input
                                type="text"
                                name="facebookUserName"
                                value={contact.facebookUserName}
                                onChange={handleContactChange}
                                placeholder="Facebook"
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                            />
                            <input
                                type="text"
                                name="instagramUserName"
                                value={contact.instagramUserName}
                                onChange={handleContactChange}
                                placeholder="Instagram"
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                            />
                            <button onClick={handleSaveContact}
                                    className="bg-green-500 text-white py-2 px-4 rounded mt-2">Guardar
                            </button>
                        </div>
                    ) : (
                        <ul>
                            <li>📞 {contact.phone}</li>
                            <li>✉️ {contact.email}</li>
                            <li>📘 {contact.facebookUserName || "Ingresa tu usuario de Facebook"}</li>
                            <li>📸 {contact.instagramUserName || "Ingresa tu usuario de Instagram"}</li>
                        </ul>
                    )}
                </section>

                <section className="profile-reviews">
                    <h3>Calificaciones</h3>
                    <div className="review-card">
                        <div className="reviewer-picture"></div>
                        <div className="review-details">
                            <h4>COLLEN MARIA BECERRA RICHI</h4>
                            <span>★★★★☆ 15 días atrás</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProfileTenant;