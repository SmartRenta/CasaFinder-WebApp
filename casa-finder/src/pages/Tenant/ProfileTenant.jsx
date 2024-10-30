// ProfileTenant.jsx
import React from "react";
import './ProfileTenant.css';

const ProfileTenant = () => {
  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-picture">
          <img alt="profile" />
        </div>
        <div className="profile-info">
          <h2>SOFIA LUCIA BARRUETA LOPEZ</h2>
          <p>Se unió el 12 de diciembre de 2021</p>
        </div>
        <div className="profile-rating">
          <div className="rating-star">★</div>
          <span>4 Bueno</span>
        </div>
      </header>

      <div className="profile-main">
        {/* Descripción */}
        <section className="profile-section">
          <h3>Descripción</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </section>

        {/* Calificaciones */}
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

        {/* Contacto */}
        <section className="profile-contact">
          <ul>
            <li>📞 987654321</li>
            <li>✉️ prueba@gmail.com</li>
            <li>📘 sofiaLaChevere</li>
            <li>📸 sofiaLaChevere</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ProfileTenant;
