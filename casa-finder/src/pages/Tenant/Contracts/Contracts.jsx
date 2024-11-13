import React, { useState, useEffect,useRef } from "react";
import { useForm } from "react-hook-form";
import CreateContractStepOne from "./CreateContractStepOne.jsx";
import CreateContractStepTwo from "./CreateContractStepTwo.jsx";
import CreateContractStepThree from "./CreateContractStepThree.jsx";
import ContractService from "../../../services/contractService.js";

const Contracts = () => {
  const [step, setStep] = useState(1);
  const [signatureSrc, setSignatureSrc] = useState(null);
  const [fingerprintSrc, setFingerprintSrc] = useState(null);
  const formRef = useRef(); // referencia al formulario
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      landlordEmail: "",
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
      propertyId: 1,
      tenantId:getUserIdFromCache(),
      startdate: new Date().toISOString().split("T")[0],
      enddate: new Date().toISOString().split("T")[0],
    },
  });
  const triggerSubmit = () => {
    formRef.current.requestSubmit();
  };

  useEffect(() => {
    register("landlordEmail", {
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
    register("password");
    register("termsandconditions");
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

  const onSubmit = handleSubmit(async (data) => {
    debugger
    try {
        const response = await ContractService.createContract(data);
        debugger
        if (response) {
            console.log("Propiedad creada:", response);
            onClose(); 
        } else {
            console.error("Error al crear el contrato.");
        }
    } catch (error) {
        console.error("Error en la creación de el contrato:", error);
    }
  });
  const nextStep = async () => {
    trigger("landlordEmail")
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
    console.log(errors)
    if (!isStepValid) {
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
      <form onSubmit={onSubmit} ref={formRef}>
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
            triggerSubmit={triggerSubmit}
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
