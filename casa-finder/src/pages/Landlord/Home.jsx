import React from "react";
import HomePropertyCard from "../../components/landLord/home/HomePropertyCard.jsx";
import {Property} from "../../entities/Property.js";
import HomePropertiesCarousel from "../../components/landLord/home/HomePropertiesCarousel.jsx";
import HomeContractCarousel from "../../components/landLord/home/HomeContractsCarousel.jsx";
import HomeTransferCarousel from "../../components/landLord/home/HomeTransferCarousel.jsx";

const propertiesData = [
    new Property(
        1,
        "Casa en Miraflores",
        500000,
        2,
        "Casa",
        1,
        3,
        2,
        "Hermosa casa en Miraflores con vista al mar.",
        ["Jardín", "Piscina"],
        ["Muebles", "Electrodomésticos"],
        ["https://theressa.net/images/projects/5cc80075c4e92-_MG_2458a.jpg", "https://img10.naventcdn.com/avisos/111/01/44/45/36/48/360x266/1483562791.jpg?isFirstImage=true"],
        {name: "Juan Perez", email: "juan.perez@example.com"},
        "Lima",
        "Lima",
        "Miraflores"
    ),
    new Property(
        2,
        "Departamento en San Isidro",
        300000,
        1,
        "Departamento",
        2,
        2,
        2,
        "Moderno departamento en San Isidro.",
        ["Gimnasio", "Sauna"],
        ["Cocina equipada", "Aire acondicionado"],
        ["https://cdn.delujo.pe/data/img/proyecto/original/prm_3101.webp", "https://cdn.delujo.pe/data/img/proyecto/original/prm_3092.webp"],
        {name: "Maria Lopez", email: "maria.lopez@example.com"},
        "Lima",
        "Lima",
        "San Isidro"
    ),
    new Property(
        1,
        "Casa en Miraflores",
        500000,
        2,
        "Casa",
        1,
        3,
        2,
        "Hermosa casa en Miraflores con vista al mar.",
        ["Jardín", "Piscina"],
        ["Muebles", "Electrodomésticos"],
        ["https://theressa.net/images/projects/5cc80075c4e92-_MG_2458a.jpg", "https://img10.naventcdn.com/avisos/111/01/44/45/36/48/360x266/1483562791.jpg?isFirstImage=true"],
        {name: "Juan Perez", email: "juan.perez@example.com"},
        "Lima",
        "Lima",
        "Miraflores"
    ),
    new Property(
        2,
        "Departamento en San Isidro",
        300000,
        1,
        "Departamento",
        2,
        2,
        2,
        "Moderno departamento en San Isidro.",
        ["Gimnasio", "Sauna"],
        ["Cocina equipada", "Aire acondicionado"],
        ["https://cdn.delujo.pe/data/img/proyecto/original/prm_3101.webp", "https://cdn.delujo.pe/data/img/proyecto/original/prm_3092.webp"],
        {name: "Maria Lopez", email: "maria.lopez@example.com"},
        "Lima",
        "Lima",
        "San Isidro"
    ),
    new Property(
        2,
        "Departamento en San Isidro",
        300000,
        1,
        "Departamento",
        2,
        2,
        2,
        "Moderno departamento en San Isidro.",
        ["Gimnasio", "Sauna"],
        ["Cocina equipada", "Aire acondicionado"],
        ["https://cdn.delujo.pe/data/img/proyecto/original/prm_3101.webp", "https://cdn.delujo.pe/data/img/proyecto/original/prm_3092.webp"],
        {name: "Maria Lopez", email: "maria.lopez@example.com"},
        "Lima",
        "Lima",
        "San Isidro"
    ),
    new Property(
        2,
        "Departamento en San Isidro",
        300000,
        1,
        "Departamento",
        2,
        2,
        2,
        "Moderno departamento en San Isidro.",
        ["Gimnasio", "Sauna"],
        ["Cocina equipada", "Aire acondicionado"],
        ["https://cdn.delujo.pe/data/img/proyecto/original/prm_3101.webp", "https://cdn.delujo.pe/data/img/proyecto/original/prm_3092.webp"],
        {name: "Maria Lopez", email: "maria.lopez@example.com"},
        "Lima",
        "Lima",
        "San Isidro"
    )
]
const contractsData = [
    {
        id: 1,
        property: propertiesData[0],
        name: "Juan Perez",
        date: "01/01/2021",
        pdfImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/640px-PDF_file_icon.svg.png"
    },
    {
        id: 2,
        property: propertiesData[1],
        name: "Maria Lopez",
        date: "01/01/2021",
        pdfImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/640px-PDF_file_icon.svg.png"
    },
    {
        id: 3,
        property: propertiesData[2],
        name: "Juan Perez",
        date: "01/01/2021",
        pdfImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/640px-PDF_file_icon.svg.png"
    },
    {
        id: 4,
        property: propertiesData[3],
        name: "Maria Lopez",
        date: "01/01/2021",
        pdfImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/640px-PDF_file_icon.svg.png"
    }
]

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
]

const Home = () => {
    return (
        <>
            <h2 className="my-2">Mis Propiedades</h2>
            <HomePropertiesCarousel properties={propertiesData}/>
            <h2 className="my-2">Mis Contratos</h2>
            <HomeContractCarousel contracts={contractsData}/>
            <h2 className="my-2">Mis Transferencias</h2>
            <HomeTransferCarousel transfers={transfersData}/>
        </>
    );
};

export default Home;