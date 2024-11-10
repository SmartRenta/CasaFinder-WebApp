export class Property {
  constructor(
    id = "",
    title = "",
    price = "",
    currency = "USD",
    timePeriod = "1",
    floors = "",
    type = "",
    parking = "",
    rooms = "",
    bathrooms = "",
    description = "",
    features = [""],
    includes = [""],
    images = [""],
    contact = { name: "", email: "" },
    region = "",
    province = "",
    district = "",
    address = ""
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.currency = currency;
    this.timePeriod = timePeriod;
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
    this.address = address;
  }

  formatPrice() {
    return `${this.currency} ${parseFloat(this.price).toLocaleString()}`;
  }

  getFullAddress() {
    if (this.region && this.province && this.district) {
      return `${this.address ? this.address + ', ' : ''}${this.district}, ${this.province}, ${this.region}`;
    }
    return "Dirección no disponible";
  }

  getPropertyDetails() {
    return `
      ${this.title}
      Precio: ${this.formatPrice()}
      Periodo: ${this.timePeriod}
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