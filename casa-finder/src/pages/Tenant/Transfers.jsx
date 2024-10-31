import React from "react";
import HomeTransferCard from "../../components/landLord/home/HomeTransferCard"; // Asegúrate de ajustar la ruta si es necesario

const transfersData = [
    {
        id: 1,
        date: "01/01/2021",
        image: "https://cdn-icons-png.flaticon.com/512/1067/1067281.png"
    },
    {
        id: 2,
        date: "01/01/2021",
        image: "https://cdn-icons-png.flaticon.com/512/1067/1067281.png"
    },
    {
        id: 3,
        date: "01/01/2021",
        image: "https://cdn-icons-png.flaticon.com/512/1067/1067281.png"
    },
    {
        id: 4,
        date: "01/01/2021",
        image: "https://cdn-icons-png.flaticon.com/512/1067/1067281.png"
    },
    {
      id: 5,
      date: "01/01/2021",
      image: "https://cdn-icons-png.flaticon.com/512/1067/1067281.png"
  },
  {
    id: 6,
    date: "01/01/2021",
    image: "https://cdn-icons-png.flaticon.com/512/1067/1067281.png"
}

];

const Transfers = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Transferencias</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {transfersData.map((transfer) => (
                    <HomeTransferCard 
                        key={transfer.id} 
                        image={transfer.image} 
                        date={transfer.date} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Transfers;
