export class Property {
    constructor(
      id,
      title,
      price,
      floors,
      type,
      parking,
      rooms,
      bathrooms,
      description,
      features,
      includes,
      images,
      contact, 
      region = "", 
      province = "", 
      district = ""
    ) {
      this.id = id;
      this.title = title;
      this.price = price;
      this.floors = floors;
      this.type = type;
      this.parking = parking;
      this.rooms = rooms;
      this.bathrooms = bathrooms;
      this.description = description;
      this.features = features;
      this.includes = includes;
      this.images = images; 
      this.contact = contact; 
      this.region = region; 
      this.province = province; 
      this.district = district; 
    }
  
    formatPrice() {
      return `S/ ${this.price.toLocaleString()}`;
    }
  
    getFullAddress() {
       if (this.region && this.province && this.district) {
        return `${this.district}, ${this.province}, ${this.region}`;
      }
      return "Dirección no disponible";
    }
  
    getPropertyDetails() {
      return `
        ${this.title}
        Precio: ${this.formatPrice()}
        Dirección: ${this.getFullAddress()}
        Descripción: ${this.description}
        Pisos: ${this.floors}
        Estacionamientos: ${this.parking}
        Habitaciones: ${this.rooms}
        Baños: ${this.bathrooms}
        Tipo: ${this.type}
        Características: ${this.features.join(', ')}
        Incluye: ${this.includes.join(', ')}
        Contacto: ${this.contact.name}, Email: ${this.contact.email}
      `;
    }
  }
  