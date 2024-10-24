import {FaPlus} from "react-icons/fa";

const NewPropertieButton = ({onClick}) => {
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center rounded-md bg-blue-500 px-6 py-3 text-lg font-medium text-white hover:bg-blue-600 transition-colors">
            <FaPlus className="mr-2"/>
            Nueva Propiedad
        </button>
    );
};

export default NewPropertieButton;