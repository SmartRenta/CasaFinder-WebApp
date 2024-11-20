import React from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CreateContractStepOne = ({
  errors,
  setValue,
  formValues,
  nextStep,
  fingerprintSrc,
  setFingerprintSrc,
  signatureSrc,
  setSignatureSrc,
}) => {
  return (
    <div className="form-container border rounded-lg shadow-lg p-4">
      <div
        style={{
          fontWeight: "bold",
          fontSize: 20,
          borderBottom: "black 1px solid",
        }}
      >
        Por favor ingrese todos los datos
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: 8,
          marginBottom: 20,
          marginTop: 20,
          borderBottom: "1px black solid",
        }}
      >
        <TextField
          style={{ width: "66%", marginBottom: 20 }}
          label="Dirección"
          variant="outlined"
          value={formValues.address}
          onChange={(e) => {
            setValue("address", e?.target?.value || "");
          }}
          error={errors?.address?.message}
          helperText={errors?.address?.message}
        />
        <TextField
          style={{ width: "33%" }}
          select
          label="País"
          value={formValues.country}
          onChange={(e) => {
            setValue("country", e?.target?.value || "");
          }}
          error={errors?.country?.message}
          helperText={errors?.country?.message}
        >
          <MenuItem key={"PE"} value={"PE"}>
            Perú
          </MenuItem>
          <MenuItem key={"MX"} value={"MX"}>
            Mexico
          </MenuItem>
        </TextField>
      </div>
      <div style={{ display: "flex", width: "100%", gap: 8, marginBottom: 10 }}>
        <TextField
          style={{ width: "33%" }}
          label="Fecha de inicio de alquiler"
          variant="outlined"
          type="date"
          value={formValues.startDate}
          onChange={(e) => {
            setValue("startDate", e?.target?.value || "");
          }}
          error={errors?.startDate?.message}
          helperText={errors?.startDate?.message}
        />
        <TextField
          style={{ width: "33%" }}
          label="Fecha de fin de alquiler"
          variant="outlined"
          type="date"
          value={formValues.endDate}
          onChange={(e) => {
            setValue("endDate", e?.target?.value || "");
          }}
          error={errors?.endDate?.message}
          helperText={errors?.endDate?.message}
        />
        <TextField
          style={{ width: "33%" }}
          select
          label="Frecuencia"
          value={formValues.frequency}
          onChange={(e) => {
            setValue("frequency", e?.target?.value || "");
          }}
          error={errors?.frequency?.message}
          helperText={errors?.frequency?.message}
        >
          <MenuItem key={"Bimestral"} value={"Bimestral"}>
            Bimestral
          </MenuItem>
          <MenuItem key={"Mensual"} value={"Mensual"}>
            Mensual
          </MenuItem>
          <MenuItem key={"Trimestral"} value={"Trimestral"}>
            Trimestral
          </MenuItem>
        </TextField>
      </div>
      <p style={{ color: "red", marginBottom: 20, paddingBottom: 20,  borderBottom: "black 1px solid", }}>
        *La fecha de inicio se considera desde las 00:00 horas y para la de fin
        hasta las 23:59 horas.
      </p>
      <div
        style={{
          display: "flex",
          width: "100%",
          paddingBottom: 20,
          marginBottom: 20,
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
            Sube tu firma digital
          </div>
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
            <Button
              component="label"
              variant="contained"
              type="button"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Subir imagen
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files[0];
                  setValue("signature", event.target.files[0]);
                  if (file && file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setSignatureSrc(reader.result);
                    };
                    reader.readAsDataURL(file);
                  } else {
                    alert("Por favor, selecciona un archivo de imagen válido.");
                  }
                }}
              />
            </Button>
          </div>
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              width: "100%",
              marginTop: 20,
            }}
          >
            {signatureSrc && (
              <img
                src={signatureSrc}
                alt="Preview"
                style={{ width: "100%", maxWidth: "300px" }}
              />
            )}
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
            Sube tu huella digital (índice derecho)
          </div>
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
            <Button
              component="label"
              variant="contained"
              type="button"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Subir imagen
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files[0];
                  setValue("fingerprint", event.target.files[0]);
                  if (file && file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setFingerprintSrc(reader.result);
                    };
                    reader.readAsDataURL(file);
                  } else {
                    alert("Por favor, selecciona un archivo de imagen válido.");
                  }
                }}
              />
            </Button>
          </div>
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              width: "100%",
              marginTop: 20,
            }}
          >
            {fingerprintSrc && (
              <img
                src={fingerprintSrc}
                alt="Preview"
                style={{ width: "100%", maxWidth: "300px" }}
              />
            )}
          </div>
        </div>
      </div>

      <div style={{ width: "100%", display: "flex", gap: 9 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setValue("termsandconditions", e.target.checked);
                }}
              />
            }
            label="Aseguro que todos los datos ingresados son verídicos."
          />
        </FormGroup>
      </div>

      <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
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

export default CreateContractStepOne;
