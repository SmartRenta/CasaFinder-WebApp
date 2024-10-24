import PropertyCard from "../components/properties/PropertyCard.jsx";
import NewPropertieButtom from "../components/properties/NewPropertieButton.jsx";
import {useState} from "react";
import NewPropertyForm from "../components/properties/NewPropertyForm.jsx";

const properties = [
    {
        name: "Beautiful House",
        description: "A beautiful house with a nice garden.",
        price: "$500,000",
        floors: 2,
        type: "House",
        parking: 2,
        rooms: 4,
        bathrooms: 3,
        image: "https://media.admagazine.com/photos/63bf8e2447e50dfe1e2f49f7/master/pass/8.-Casa-Peru.jpg"
    },
    {
        name: "Modern Apartment",
        description: "A modern apartment in the city.",
        price: "$200,000",
        floors: 1,
        type: "Apartment",
        parking: 1,
        rooms: 2,
        bathrooms: 1,
        image: "https://theressa.net/images/services/66cb93c254f3a-622d3c9ebf10e-DSC02820-HDR-1721x2582.jpg"
    },
    {
        name: "Luxury Villa",
        description: "A luxury",
        price: "$1,000,000",
        floors: 3,
        type: "Villa",
        parking: 3,
        rooms: 6,
        bathrooms: 4,
        image: "https://pic.le-cdn.com/thumbs/520x390/08/1/properties/Property-dec84c265bc9202a59ce12526f62ed2f-129972643.jpg"
    }
];

const Properties = () => {
    const [isNewPropertyFormVisible, setIsNewPropertyFormVisible] = useState(false);

    const handleButtonNewPropertyClick = () => {
        setIsNewPropertyFormVisible(true);
    };

    const handleCloseNewPropertyForm = () => {
        setIsNewPropertyFormVisible(false);
    };

    return (
        <div>
            <div className="grid grid-rows-1 gap-4">
                {properties.map((property, index) => (
                    <PropertyCard key={index} property={property}/>
                ))}
            </div>
            <div className="flex justify-center my-10">
                <NewPropertieButtom onClick={handleButtonNewPropertyClick}/>
            </div>
            {isNewPropertyFormVisible && <NewPropertyForm onClose={handleCloseNewPropertyForm}/>}
        </div>
    );
};

export default Properties;
