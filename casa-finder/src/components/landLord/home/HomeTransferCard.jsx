import {Card} from "@material-tailwind/react";

const HomeTransferCard = ({image, date}) => {
    return (
        <Card className="flex flex-col w-80 max-w-md">
            <div className="w-full">
                <img className="w-full h-80 object-fill rounded" src={image} alt="PDF"/>
            </div>
            <div className="flex-1 p-4">
                <p className="text-gray-500">{date}</p>
                <div className="mt-4">
                </div>
            </div>
        </Card>
    );
};

export default HomeTransferCard;