// ProfileLandlord.jsx

const ProfileLandlord = () => {
  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-picture">
          <img alt="profile" />
        </div>
        <div className="profile-info">
          <h2>RAUL PEDRO SANTILLAN ILO</h2>
          <p>Se unió el 12 de diciembre de 2021</p>
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
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </section>

        {/* Contacto */}
        <section className="profile-contact">
          <h3>Contacto <span className="edit-icon">✎</span></h3>
          <ul>
            <li>📞 987654321</li>
            <li>✉️ prueba@gmail.com</li>
            <li>📘 raulitoPS</li>
            <li>📸 raulitoPS</li>
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
};

export default ProfileLandlord;
