import React from "react";
import HomePropertyCard from "../../components/landLord/home/HomePropertyCard.jsx";
import {Property} from "../../entities/Property.js";
import HomePropertiesCarousel from "../../components/landLord/home/HomePropertiesCarousel.jsx";

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

const Home = () => {
    return (
        <HomePropertiesCarousel properties={propertiesData}/>
    );
};

export default Home;