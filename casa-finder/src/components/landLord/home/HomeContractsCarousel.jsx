import {FaArrowRight, FaPlusCircle} from "react-icons/fa";
import HomeContractCard from "./HomeContractsCards.jsx";

const HomeContractCarousel = ({contracts}) => {
    return (
        <div className="flex space-x-6 overflow-x-auto pb-4">
            <div className="flex space-x-6 overflow-x-auto pb-4 w-full">
                {contracts.map((contract) => (
                    <div key={contract.id} className="shrink-0 w-80">
                        <HomeContractCard property={contract.property} name={contract.name} date={contract.date}
                                          pdfImage={contract.pdfImage}/>
                    </div>
                ))}
            </div>
            <div className="shrink-0 w-24 flex flex-col justify-center items-center space-y-4 ml-auto">
                <button className="bg-sky-200 text-black py-2 px-4 rounded-full flex items-center justify-center">
                    <FaArrowRight className="text-white w-10 h-10"/>
                </button>
            </div>
        </div>
    );
}

export default HomeContractCarousel;