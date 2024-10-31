import React, { useEffect, useState } from "react";
import HomePropertyCard from "../../components/landLord/home/HomePropertyCard.jsx";
import { Property } from "../../entities/Property.js";
import HomePropertiesCarousel from "../../components/landLord/home/HomePropertiesCarousel.jsx";
import HomeContractCarousel from "../../components/landLord/home/HomeContractsCarousel.jsx";
import HomeTransferCarousel from "../../components/landLord/home/HomeTransferCarousel.jsx";
import propertiesJson from "../../data/propertiesData.json"; // Importamos el JSON

const Home = () => {
    const [propertiesData, setPropertiesData] = useState([]);
    const [contractsData, setContractsData] = useState([]);

    useEffect(() => {
        // Convertimos los datos del JSON en instancias de Property
        const loadedProperties = propertiesJson.map(propertyData => 
            new Property(
                propertyData.id,
                propertyData.title,
                propertyData.price,
                propertyData.floors,
                propertyData.type,
                propertyData.parking,
                propertyData.rooms,
                propertyData.bathrooms,
                propertyData.description,
                propertyData.features,
                propertyData.included,
                propertyData.images,
                propertyData.contact,
                propertyData.region,
                propertyData.province,
                propertyData.district
            )
        );
        setPropertiesData(loadedProperties);

        // Creamos los datos de contratos usando las propiedades cargadas
        const loadedContracts = [
            {
                id: 1,
                property: loadedProperties[0],
                name: "Juan Perez",
                date: "01/01/2021",
                pdfImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/640px-PDF_file_icon.svg.png"
            },
            {
                id: 2,
                property: loadedProperties[1],
                name: "Maria Lopez",
                date: "01/01/2021",
                pdfImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/640px-PDF_file_icon.svg.png"
            },
            {
                id: 3,
                property: loadedProperties[2],
                name: "Juan Perez",
                date: "01/01/2021",
                pdfImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/640px-PDF_file_icon.svg.png"
            },
            {
                id: 4,
                property: loadedProperties[3],
                name: "Maria Lopez",
                date: "01/01/2021",
                pdfImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/640px-PDF_file_icon.svg.png"
            }
        ];
        setContractsData(loadedContracts);
    }, []);

    const transfersData = [
        {
            id: 1,
            date: "01/01/2021",
            image: "https://cdn-icons-png.flaticon.com/512/1067/1067281.png"
        },
        {
            id: 2,
            date: "01/01/2021",
            image: "https://cdn-icons-png.flaticon.com/512/1067/1067281.png"
        },
        {
            id: 3,
            date: "01/01/2021",
            image: "https://cdn-icons-png.flaticon.com/512/1067/1067281.png"
        },
        {
            id: 4,
            date: "01/01/2021",
            image: "https://cdn-icons-png.flaticon.com/512/1067/1067281.png"
        }
    ];

    return (
        <>
            <h2 className="my-2">Mis Propiedades</h2>
            <HomePropertiesCarousel properties={propertiesData} />
            <h2 className="my-2">Mis Contratos</h2>
            <HomeContractCarousel contracts={contractsData} />
            <h2 className="my-2">Mis Transferencias</h2>
            <HomeTransferCarousel transfers={transfersData} />
        </>
    );
};

export default Home;
