import React from 'react';
import {Card} from "@material-tailwind/react";

const HomePropertyCard = ({property}) => {
    return (
            <Card className="flex flex-col w-80 max-w-md">
            <div className="w-full">
                <img className="w-full h-96 object-cover rounded" src={property.images[0]} alt={property.title} />
            </div>
            <div className="flex-1 p-4">
                <h3 className="text-lg font-medium">{property.title}</h3>
                <p className="text-gray-600 font-medium">S/. {property.price.toLocaleString()}</p>
            </div>
        </Card>
    );
};

export default HomePropertyCard;