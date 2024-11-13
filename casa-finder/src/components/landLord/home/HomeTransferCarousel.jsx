import {FaArrowRight} from "react-icons/fa";
import HomeContractCard from "./HomeContractsCards.jsx";
import HomeTransferCard from "./HomeTransferCard.jsx";

const HomeTransferCarousel = ({transfers}) => {
    return (
        <div className="flex space-x-6 overflow-x-auto pb-4">
            <div className="flex space-x-6 overflow-x-auto pb-4 w-full">
                {transfers.map((transfer) => (
                    <div key={transfer.id} className="shrink-0 w-80">
                        <HomeTransferCard date={transfer.date} image={transfer.image}/>
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

export default HomeTransferCarousel;