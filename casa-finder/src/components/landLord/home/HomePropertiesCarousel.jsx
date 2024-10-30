import HomePropertyCard from "./HomePropertyCard.jsx";
import React from "react";
import {FaArrowRight, FaPlusCircle} from "react-icons/fa";

const HomePropertiesCarousel = ({properties}) => {
    return (
        <div className="flex space-x-6 overflow-x-auto pb-4">
            <div className="flex space-x-6 overflow-x-auto pb-4 w-full">
                {properties.map((property) => (
                    <div key={property.id} className="shrink-0 w-80">
                        <HomePropertyCard property={property}/>
                    </div>
                ))}
            </div>
            <div className="shrink-0 w-24 flex flex-col justify-center items-center space-y-4 ml-auto">
                <button className="bg-sky-200 text-black py-2 px-4 rounded-full flex items-center justify-center">
                    <FaArrowRight className="text-white w-10 h-10"/>
                </button>
                <button className="bg-white text-black py-0 px-0 rounded-full flex items-center justify-center">
                    <FaPlusCircle className="text-green-500 w-14 h-14"/>
                </button>
            </div>
        </div>
    );
}

export default HomePropertiesCarousel;