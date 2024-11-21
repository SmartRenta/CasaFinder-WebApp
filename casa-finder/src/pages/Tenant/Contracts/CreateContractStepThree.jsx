import React from "react";
import PanToolIcon from "@mui/icons-material/PanTool";

const CreateContractStepThree = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 text-center">
      {/* Ícono central */}
      <PanToolIcon style={{ width: 300, height: 300, color: "#000000" }} />
      
      {/* Mensaje principal */}
      <div className="text-2xl font-bold">Por favor, espere, le notificaremos</div>
      
      {/* Mensaje secundario */}
      <div className="text-lg">
        Cuando el arrendador firme el contrato, se le notificará.
      </div>
    </div>
  );
};

export default CreateContractStepThree;
