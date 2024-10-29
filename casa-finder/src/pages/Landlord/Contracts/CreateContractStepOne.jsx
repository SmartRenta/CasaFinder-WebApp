import React from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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

const CreateContractStepOne = ({ errors, setValue, formValues, nextStep }) => {
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
      <TextField
        style={{ width: "100%", margin: "20px 0" }}
        label="Nombres completos"
        variant="outlined"
        value={formValues.fullname}
        onChange={(e) => {
          setValue("fullname", e?.target?.value || "");
        }}
        error={errors?.fullname?.message}
        helperText={errors?.fullname?.message}
      />
      <div style={{ display: "flex", width: "100%", gap: 8, marginBottom: 20 }}>
        <TextField
          style={{ width: "33%" }}
          select
          label="Tipo de documento"
          value={formValues.doctype}
          onChange={(e) => {
            setValue("doctype", e?.target?.value || "");
          }}
          error={errors?.doctype?.message}
          helperText={errors?.doctype?.message}
        >
          <MenuItem key={"DNI"} value={"DNI"}>
            DNI
          </MenuItem>
          <MenuItem key={"RUC"} value={"RUC"}>
            RUC
          </MenuItem>
        </TextField>
        <TextField
          style={{ width: "33%" }}
          label="Número de documento"
          variant="outlined"
          type="number"
          value={formValues.docnum}
          onChange={(e) => {
            setValue("docnum", e?.target?.value || "");
          }}
          error={errors?.docnum?.message}
          helperText={errors?.docnum?.message}
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
      <TextField
        style={{ width: "100%", marginBottom: 20 }}
        label="Dirección"
        variant="outlined"
        value={formValues.address}
        onChange={(e) => {
          setValue("address", e?.target?.value || "");
        }}
        error={errors?.address?.message}
        helperText={errors?.address?.message}
      />
      <div style={{ display: "flex", width: "100%", gap: 8, marginBottom: 10 }}>
        <TextField
          style={{ width: "50%" }}
          label="Fecha de inicio de alquiler"
          variant="outlined"
          type="date"
          value={formValues.startdate}
          onChange={(e) => {
            setValue("startdate", e?.target?.value || "");
          }}
          error={errors?.startdate?.message}
          helperText={errors?.startdate?.message}
        />
        <TextField
          style={{ width: "50%" }}
          label="Fecha de fin de alquiler"
          variant="outlined"
          type="date"
          value={formValues.enddate}
          onChange={(e) => {
            debugger;
            setValue("enddate", e?.target?.value || "");
          }}
          error={errors?.enddate?.message}
          helperText={errors?.enddate?.message}
        />
      </div>
      <p style={{ color: "red", marginBottom: 20 }}>
        *La fecha de inicio se considera desde las 00:00 horas y para la de fin
        hasta las 23:59 horas.
      </p>
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: 8,
          paddingBottom: 20,
          marginBottom: 20,
          borderBottom: "1px black solid",
        }}
      >
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
      <TextField
        style={{ width: "100%", marginBottom: 20 }}
        label="Numero de tarjeta de crédito (mismo titular)"
        variant="outlined"
        type="number"
        value={formValues.cardnumber}
        onChange={(e) => {
          setValue("cardnumber", e?.target?.value || "");
        }}
        error={errors?.cardnumber?.message}
        helperText={errors?.cardnumber?.message}
      />
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: 8,
          paddingBottom: 20,
          marginBottom: 20,
          borderBottom: "1px black solid",
        }}
      >
        <TextField
          style={{ width: "50%", marginBottom: 20 }}
          label="Fecha de Vencimiento"
          variant="outlined"
          type="month"
          value={formValues.expirationdate}
          onChange={(e) => {
            setValue("expirationdate", e?.target?.value || "");
          }}
          error={errors?.expirationdate?.message}
          helperText={errors?.expirationdate?.message}
        />
        <TextField
          style={{ width: "50%", marginBottom: 20 }}
          label="CVV"
          variant="outlined"
          type="number"
          value={formValues.cvv}
          onChange={(e) => {
            setValue("cvv", e?.target?.value || "");
          }}
          error={errors?.cvv?.message}
          helperText={errors?.cvv?.message}
        />
      </div>
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
                  setValue("signature", event.target.files[0]);
                }}
              />
            </Button>
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
                  setValue("fingerprint", event.target.files[0]);
                }}
              />
            </Button>
          </div>
        </div>
      </div>

      <div style={{ width: "100%", display: "flex", gap: 9 }}>
        <input type="checkbox" />
        <div>Aseguro que todos los datos ingresados son verídicos.</div>
      </div>

<div style={{width: "100%", justifyContent: "end", display: "flex"}}>

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
