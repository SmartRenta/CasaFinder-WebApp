import React from "react";
import { TextField, Button } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const CreateContractStepTwo = ({
  errors,
  setValue,
  formValues,
  nextStep,
  prevStep, fingerprintSrc, signatureSrc
}) => {
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
        Yo, {formValues.fullname} identificada con {formValues.doctype}{" "}
        {formValues.docnum} con número de telefono {formValues.phone} y con
        domicilio
        {formValues.address}, {formValues.country}, de ahora en adelante declaro
        mi intencion de alquilar la propiedad de John Doe identificado con DNI
        1234569 con número de celular 987654312 y domicilio en Jr. Nueva Yoirk
        789, de ahora en adelante llamado EL ARRENDADOR, desde el{" "}
        {formValues.startdate.split("-").reverse().join("/")} hasta el{" "}
        {formValues.enddate.split("-").reverse().join("/")}.
      </div>
      <div
        style={{
          fontWeight: "bold",
          fontSize: 16,
          borderBottom: "black 1px solid",
          paddingTop: 10,
        }}
      >
        1. Débito automático
      </div>
      <div
        style={{
          fontSize: 16,
        }}
      >
        Yo, LA ARRENDATARIA, autorizo el débito automático a la tarjeta de
        crédito {formValues.cardnumber} a mi mismo nombre bajo el monto acordado
        de S/ 25,500.00 con una frecuencia de pago bimestral y además, la
        retención de los 4 meses de garantía solicitados
      </div>
      <div
        style={{
          fontWeight: "bold",
          fontSize: 16,
          borderBottom: "black 1px solid",
          paddingTop: 10,
        }}
      >
        2. Servicio incluido
      </div>
      <div
        style={{
          fontSize: 16,
        }}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
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
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
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
          type="button"
          color="success"
          tabIndex={-1}
          onClick={nextStep}
        >
          Acepto
        </Button>
      </div>
    </div>
  );
};

export default CreateContractStepTwo;
