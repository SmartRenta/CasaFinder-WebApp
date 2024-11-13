import React, { useEffect, useState } from "react";
import HomePropertyCard from "../../components/landLord/home/HomePropertyCard.jsx";
import HomePropertiesCarousel from "../../components/landLord/home/HomePropertiesCarousel.jsx";
import HomeContractCarousel from "../../components/landLord/home/HomeContractsCarousel.jsx";
import HomeTransferCarousel from "../../components/landLord/home/HomeTransferCarousel.jsx";
import PropertyService from "../../services/propertyService";
import { getUserIdFromCache } from "../../utils/authUtils.js";
import contractsJson from "../../data/contracts.json"; // Suponiendo que sigues usando datos estáticos para contratos

const Home = () => {
    const [propertiesData, setPropertiesData] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            const landlordId = getUserIdFromCache(); // Obtiene el ID del landlord desde el caché
            if (landlordId) {
                const loadedProperties = await PropertyService.getPropertiesByLandlord(landlordId);
                setPropertiesData(loadedProperties);
            }
        };

        fetchProperties();
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
