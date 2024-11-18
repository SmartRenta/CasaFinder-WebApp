import React, { useState, useEffect,useRef } from "react";
import { useForm } from "react-hook-form";
import CreateContractStepOne from "./CreateContractStepOne.jsx";
import CreateContractStepTwo from "./CreateContractStepTwo.jsx";
import CreateContractStepThree from "./CreateContractStepThree.jsx";
import ContractService from "../../../services/contractService.js";
import { getUserIdFromCache } from "../../../utils/authUtils";

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
      creditcard: "",
      cvv: "",
      signature: "",
      fingerprint: "",
      password: "",
      termsandconditions: false,
      termsandconditions2: false,
      expirationDate: "",
      phone: "",
      propertyId: 1,
      tenantId:getUserIdFromCache(),
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
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
    register("startDate", {
      validate: (value) => (value && value.length) || "El campo es requerido",
    });
    register("endDate", {
      validate: (value) => (value && value.length) || "El campo es requerido",
    });
    register("expirationDate", {
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
    register("creditcard", {
      validate: (value) => value > 0 || "El campo es requerido",
    });
    register("cvv", {
      validate: (value) => value > 0 || "El campo es requerido",
    });
  }, [register]);

  const formValues = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
        const response = await ContractService.createContract({...data,
          signature: signatureSrc,
          fingerprint: fingerprintSrc
        });
        if (response) {
          debugger
            console.log("Propiedad creada:", response);
            setStep((prev) => prev + 1);
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
    trigger("creditcard")
    trigger("cvv")
    trigger("signature")
    trigger("fingerprint")
    trigger("termsandconditions")
    trigger("expirationDate")
    trigger("phone")
    trigger("startDate")
    trigger("endDate")
    const isStepValid = Object.keys(errors).length === 0;
    console.log("isStepValid: "+isStepValid);
    if (isStepValid) {
      setStep((prev) => prev + 1);
    }else{
      console.log("errors:");
      console.table(errors);
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
