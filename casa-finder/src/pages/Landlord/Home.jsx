import React, { useEffect, useState } from "react";
import HomePropertyCard from "../../components/landLord/home/HomePropertyCard.jsx";
import { Property } from "../../entities/Property.js";
import HomePropertiesCarousel from "../../components/landLord/home/HomePropertiesCarousel.jsx";
import HomeContractCarousel from "../../components/landLord/home/HomeContractsCarousel.jsx";
import HomeTransferCarousel from "../../components/landLord/home/HomeTransferCarousel.jsx";
import propertiesJson from "../../data/propertiesData.json"; // Importamos el JSON
import contractsJson from "../../data/contracts.json"; 

const Home = () => {
    const [propertiesData, setPropertiesData] = useState([]);
    //const [contractsData, setContractsData] = useState([]);

    useEffect(() => {
        // Convertimos los datos del JSON en instancias de Property
        const loadedProperties = propertiesJson.map(propertyData => 
            new Property(
                propertyData.id,
                propertyData.title,
                propertyData.price,
                propertyData.currency,       // Agregado campo currency
                propertyData.timePeriod,     // Agregado campo timePeriod
                propertyData.floors,
                propertyData.type,
                propertyData.parking,
                propertyData.rooms,
                propertyData.bathrooms,
                propertyData.description,
                propertyData.features,
                propertyData.includes,       // Asegúrate de que el JSON tenga `includes`
                propertyData.images,
                propertyData.contact,
                propertyData.region,
                propertyData.province,
                propertyData.district,
                propertyData.address         // Agregado campo address
            )
        );
        setPropertiesData(loadedProperties);

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
        <div>
            <h2 className="my-2">Mis Propiedades</h2>
            <HomePropertiesCarousel properties={propertiesData} />
            <h2 className="my-2">Mis Contratos</h2>
            <HomeContractCarousel contracts={contractsJson} />
            <h2 className="my-2">Mis Transferencias</h2>
            <HomeTransferCarousel transfers={transfersData} />
        </div>
    );
};

export default Home;
