import {Card} from "@material-tailwind/react";

const HomeContractCard = ({property, name, date, pdfImage}) => {
    return (
        <Card className="flex flex-col w-80 max-w-md">
            <div className="w-full">
                <img className="w-full h-80 object-fill rounded" src={pdfImage} alt="PDF"/>
            </div>
            <div className="flex-1 p-4">
                <h3 className="text-lg font-medium">{property.title}</h3>
                <p className="text-gray-700 mt-2">{name}</p>
                <p className="text-gray-500">{date}</p>
                <div className="mt-4">
                </div>
            </div>
        </Card>
    );
};

export default HomeContractCard;