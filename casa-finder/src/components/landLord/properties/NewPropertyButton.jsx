import { FaPlus } from "react-icons/fa";

const NewPropertyButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-primary text-white py-2 rounded-md mt-4 hover:bg-primary-dark inline-flex items-center px-4"
        >
            <FaPlus className="mr-2" />
            Nueva Propiedad
        </button>
    );
};

export default NewPropertyButton;
