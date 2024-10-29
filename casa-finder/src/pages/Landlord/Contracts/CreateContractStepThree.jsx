import React from "react";
import PanToolIcon from '@mui/icons-material/PanTool';

const CreateContractStepThree = ({
}) => {
  return (
    <div style={{justifyContent: "center", margin: 20}}>
      <div style={{display: "flex", justifyContent: "center"}}>
        <PanToolIcon style={{width: 400, height: 400}}/>
      </div>
      <div style={{display: "flex", justifyContent: "center", margin: 20, fontWeight: "bold", fontSize: 50}}>Por favor, espere, le notificaremos</div>
      <div style={{display: "flex", justifyContent: "center", fontSize: 30}}>Cuando el arrendador firme el contrato se le notificará</div>
    </div>
  );
};

export default CreateContractStepThree;
