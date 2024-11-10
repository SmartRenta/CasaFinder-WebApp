export class User {
    constructor(
        id,
        name,
        lastName,
        description,
        phone,
        email,
        password,
        facebookUserName,
        instagramUserName,
        userType,
        documentType,
        documentNumber
    ) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.description = description;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.facebookUserName = facebookUserName;
        this.instagramUserName = instagramUserName;
        this.userType = userType;
        this.documentType = documentType;
        this.documentNumber = documentNumber;
    }

    getFullName() {
        return `${this.name} ${this.lastName}`;
    }

    getUserDetails() {
        return `
            ${this.getFullName()}
            Email: ${this.email}
            Teléfono: ${this.phone}
            Descripción: ${this.description}
            Facebook: ${this.facebookUserName}
            Instagram: ${this.instagramUserName}
        `;
    }
}
