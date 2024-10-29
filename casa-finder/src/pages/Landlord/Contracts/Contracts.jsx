import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CreateContractStepOne from "./CreateContractStepOne.jsx";
import CreateContractStepTwo from "./CreateContractStepTwo.jsx";
import CreateContractStepThree from "./CreateContractStepThree.jsx";

const Contracts = () => {
  const [step, setStep] = useState(1);
  const [signatureSrc, setSignatureSrc] = useState(null);
  const [fingerprintSrc, setFingerprintSrc] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    trigger,
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
      password: "",
      termsandconditions: false,
      termsandconditions2: false,
      expirationdate: "",
      phone: "",
      startdate: new Date().toISOString().split("T")[0],
      enddate: new Date().toISOString().split("T")[0],
    },
  });

  useEffect(() => {
    register("fullname", {
      validate: (value) => (value && value.length) || "El campo es requerido",
    });
    register("doctype", {
      validate: (value) => (value && value.length) || "El campo es requerido",
    });
    register("frequency", {
      validate: (value) => (value && value.length) || "El campo es requerido",
    });
    register("address", {
      validate: (value) => (value && value.length) || "El campo es requerido",
    });
    register("country", {
      validate: (value) => (value && value.length) || "El campo es requerido",
    });
    register("startdate", {
      validate: (value) => (value && value.length) || "El campo es requerido",
    });
    register("enddate", {
      validate: (value) => (value && value.length) || "El campo es requerido",
    });
    register("expirationdate", {
      validate: (value) => (value && value.length) || "El campo es requerido",
    });
    register("password", {
      validate: (value) => (value && value.length) || "El campo es requerido",
    });
    register("termsandconditions", {
      validate: (value) => value || "Debe aceptar los terminos y condiciones",
    });
    register("termsandconditions2", {
      validate: (value) => value || "Debe aceptar los terminos y condiciones",
    });
    register("signature", {
      validate: (value) => value || "Debe aceptar los terminos y condiciones",
    });
    register("fingerprint", {
      validate: (value) => value || "Debe aceptar los terminos y condiciones",
    });
    register("docnum", {
      validate: (value) => value > 0 || "El campo es requerido",
    });
    register("phone", {
      validate: (value) => value > 0 || "El campo es requerido",
    });
    register("cardnumber", {
      validate: (value) => value > 0 || "El campo es requerido",
    });
    register("cvv", {
      validate: (value) => value > 0 || "El campo es requerido",
    });
  }, [register]);

  const formValues = watch();

  const onSubmit = (data) => {
    console.log("Formulario completo:", data);
    alert("Formulario enviado correctamente");
  };
  const nextStep = async () => {
    trigger("fullname")
    trigger("doctype")
    trigger("docnum")
    trigger("address")
    trigger("frequency")
    trigger("country")
    trigger("cardnumber")
    trigger("cvv")
    trigger("signature")
    trigger("fingerprint")
    trigger("termsandconditions")
    trigger("expirationdate")
    trigger("phone")
    trigger("startdate")
    trigger("enddate")
    const isStepValid = Object.keys(errors).length === 0;
    if (isStepValid) {
      setStep((prev) => prev + 1);
    }else{
      alert("Los datos no pertenecen al titular");
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
            fingerprintSrc={fingerprintSrc} setFingerprintSrc={setFingerprintSrc}
            signatureSrc={signatureSrc} setSignatureSrc={setSignatureSrc}
          />
        )}
        {step === 2 && (
          <CreateContractStepTwo
            setValue={setValue}
            errors={errors}
            formValues={formValues}
            nextStep={nextStep}
            prevStep={prevStep}
            signatureSrc={signatureSrc}
            fingerprintSrc={fingerprintSrc}
          />
        )}
        {step === 3 && 
          <CreateContractStepThree
          />}
      </form>
    </div>
  );
};

export default Contracts;
