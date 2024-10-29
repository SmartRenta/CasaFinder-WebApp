import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CreateContractStepOne from "./CreateContractStepOne.jsx";
//import "../../styles/Contracts.css";

const Contracts = () => {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      fullname: "",
      doctype: "",
      docnum: "",
      address: "",
      frequency: "",
      country: "",
      cardnumber: "",
      cvv: "",
      signature: "",
      fingerprint: "",
      expirationdate: "",
      startdate: new Date().toISOString().split('T')[0],
      enddate: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    register("fullname", { validate: (value) => (value && value.length) || "El campo es requerido", });
    register("doctype", { validate: (value) => (value && value.length) || "El campo es requerido", });
    register("frequency", { validate: (value) => (value && value.length) || "El campo es requerido", });
    register("address", { validate: (value) => (value && value.length) || "El campo es requerido", });
    register("country", { validate: (value) => (value && value.length) || "El campo es requerido", });
    register("startdate", { validate: (value) => (value && value.length) || "El campo es requerido", });
    register("enddate", { validate: (value) => (value && value.length) || "El campo es requerido", });
    register("expirationdate", { validate: (value) => (value && value.length) || "El campo es requerido", });
    register("docnum", { validate: (value) => (value>0) || "El campo es requerido", });
    register("cardnumber", { validate: (value) => (value>0) || "El campo es requerido", });
    register("cvv", { validate: (value) => (value>0) || "El campo es requerido", });
  }, [register]);
  const formValues = watch();
  const onSubmit = (data) => {
    console.log("Formulario completo:", data);
    alert("Formulario enviado correctamente");
  };
  const nextStep = () => {
    debugger
    const isStepValid = Object.keys(errors).length === 0;
    if (isStepValid) {
      setStep((prev) => prev + 1);
    } else {
      alert(
        "Por favor completa todos los campos correctamente antes de continuar."
      );
    }
  };
  const prevStep = () => {
    setStep((prev) => prev - 1);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <CreateContractStepOne
            setValue={setValue}
            errors={errors}
            formValues={formValues}
            nextStep={nextStep}
          />
        )}
        {step === 2 && <div />}
        {step === 3 && <div />}

        <div>
          {step > 1 && (
            <button type="button" onClick={prevStep}>
              Anterior
            </button>
          )}
          {step < 3 && (
            <button type="button" onClick={nextStep}>
              Siguiente
            </button>
          )}
          {step === 3 && <button type="submit">Enviar</button>}
        </div>
      </form>
    </div>
  );
};

export default Contracts;
