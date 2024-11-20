import React from "react";
import { TextField, Button } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const CreateContractStepTwo = ({
  errors,
  setValue,
  formValues,
  triggerSubmit,
  property, userData,
  prevStep, fingerprintSrc, signatureSrc
}) => {
  console.table(property);
  return (
    <div className="form-container border rounded-lg shadow-lg p-4">
      <div
        style={{
          fontWeight: "bold",
          fontSize: 25,
          textAlign: "center",
        }}
      >
        Contrato digital
      </div>
      <div
        style={{
          fontWeight: "bold",
          fontSize: 16,
          borderBottom: "black 1px solid",
        }}
      >
        Por favor lea detalladamente:
      </div>
      <div
        style={{
          fontSize: 16,
        }}
      >
        Yo, {userData.name} {userData.lastName} identificado con {userData.documentType} {userData.documentNumber} con 
        número de teléfono {userData.phone} y con
        domicilio en {formValues.address}, {formValues.country}, de ahora en adelante llamado EL ARRENDATARIO, 
        por la presente declaro mi intención de alquilar la propiedad 
        de {property.landlord.name} {property.landlord.lastName} identificado 
        con {property.landlord.documentType} {property.landlord.documentNumber} con número de teléfono {property.landlord.phone}, de ahora en adelante llamado EL ARRENDADOR, 
        desde el {formValues.startDate.split("-").reverse().join("/")} hasta el {formValues.endDate.split("-").reverse().join("/")}.
      </div>
      <div
        style={{
          fontWeight: "bold",
          fontSize: 16,
          borderBottom: "black 1px solid",
          paddingTop: 10,
        }}
      >
        1. Pago frecuente
      </div>
      <div
        style={{
          fontSize: 16,
        }}
      >
        Yo, EL ARRENDATARIO, doy fe del pago bajo el monto acordado de {property.currency} {property.price} con una frecuencia de pago {formValues.frequency}.
      </div>
      <div
        style={{
          fontWeight: "bold",
          fontSize: 16,
          borderBottom: "black 1px solid",
          paddingTop: 10,
        }}
      >
        2. Servicios incluidos
      </div>
      <div
        style={{
          fontSize: 16,
        }}
      >
        Se incluyen los siguientes servicios:
        <ul>
        {
            property?.includes.map( (value, index) => (
                <li key={index}>▪ {value}</li>
            ))
        }
        </ul>
        <br></br>
        Las ventajas con las que cuenta son:
        <ul>
        {
            property?.features.map((value, index) => (
                <li key={index}>▪ {value}</li>
            ))
        }
        </ul>
      </div>
      <div
        style={{
          fontWeight: "bold",
          fontSize: 16,
          borderBottom: "black 1px solid",
          paddingTop: 10,
        }}
      >
        3. Estándares de seguridad
      </div>
      <div
        style={{
          fontSize: 16,
        }}
      >
        EL ARRENDATARIO está obligado a permitir la inspección del bien arrendado por parte del ARRENDADOR, 
        para cuyo efecto éste deberá cursar previo aviso por escrito, con una anticipación no menor de dos días. Queda convenido que forma parte de la inspección del bien arrendado, la exhibición de los recibos debidamente cancelados correspondientes a los servicios y tributos que se refiere la cláusula novena.
        EL ARRENDATARIO está obligado a efectuar por cuenta y costo propio las reparaciones y mantenimientos que sean necesarios para conservar el bien en el mismo estado en que fue recibido.
        EL ARRENDATARIO se obliga a desocupar el bien arrendado en la fecha de vencimiento del plazo estipulado en la cláusula sexta de este contrato, salvo renovación del mismo.
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          paddingBottom: 20,
          marginTop: 20,
          borderBottom: "1px black solid",
        }}
      >
        <div
          style={{
            width: "50%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
              fontWeight: "bold",
              fontSize: 16,
              width: "100%",
            }}
          >
            Firma digital
          </div>
          <div style={{justifyContent: "center", display: "flex", width: "100%", marginTop: 20}}>
            {signatureSrc && <img src={signatureSrc} alt="Preview" style={{ width: "100%", maxWidth: "300px" }} />}
          </div>
        </div>
        <div
          style={{
            width: "50%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
              fontWeight: "bold",
              fontSize: 16,
              width: "100%",
            }}
          >
            Huella digital
          </div>
          <div style={{justifyContent: "center", display: "flex", width: "100%", marginTop: 20}}>
            {fingerprintSrc && <img src={fingerprintSrc} alt="Preview" style={{ width: "100%", maxWidth: "300px" }} />}
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          marginTop: 10,
          gap: 9,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center"
        }}
      >
        <div>Confirma tu contraseña:</div>        
        <TextField
          style={{  marginBottom: 20 }}
          variant="outlined"
          size="small"
          type="password"
          value={formValues.password}
          onChange={(e) => {
            setValue("password", e?.target?.value || "");
          }}
          error={errors?.password?.message}
          helperText={errors?.password?.message}
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: 9,
          justifyContent: "center",
        }}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setValue("termsandconditions2", e.target.checked);
                }}
              />
            }
            label="He leído los términos y condiciones del servicio"
          />
        </FormGroup>
      </div>

      <div style={{ width: "100%", justifyContent: "center", display: "flex", gap: 9 }}>
        <Button
          component="label"
          variant="contained"
          type="button"
          color="error"
          tabIndex={-1}
          onClick={prevStep}
          >
          Volver
        </Button>
        <Button
          component="label"
          variant="contained"
          type="submit"
          color="success"
          tabIndex={-1}
          onClick={triggerSubmit}
        >
          Acepto
        </Button>
      </div>
    </div>
  );
};

export default CreateContractStepTwo;
