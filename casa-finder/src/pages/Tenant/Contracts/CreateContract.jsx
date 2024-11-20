import React, { useState, useEffect,useRef } from "react";
import { useForm } from "react-hook-form";
import CreateContractStepOne from "./CreateContractStepOne.jsx";
import CreateContractStepTwo from "./CreateContractStepTwo.jsx";
import CreateContractStepThree from "./CreateContractStepThree.jsx";
import ContractService from "../../../services/contractService.js";
import { getUserIdFromCache } from "../../../utils/authUtils.js";
import { useParams } from "react-router-dom";
import PropertyService from "../../../services/propertyService.js"; 
import {getUserData} from "../../../services/userService.js"; 

const CreateContract = () => {
  const { propertyId, landlordId } = useParams();
  const [step, setStep] = useState(1);
  const [signatureSrc, setSignatureSrc] = useState(null);
  const [fingerprintSrc, setFingerprintSrc] = useState(null);
  const [property, setProperty] = useState(null);
  const [userData, setUserData] = useState(null);
  const formRef = useRef(); // referencia al formulario

  console.log(new Date().toLocaleDateString());
  console.log(new Date().toLocaleDateString().split("/").reverse().join("-"));


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      landlordId: landlordId,
      address: "",
      frequency: "",
      country: "",
      signature: "",
      fingerprint: "",
      password: "",
      termsandconditions: false,
      termsandconditions2: false,
      propertyId: propertyId,
      tenantId:getUserIdFromCache(),
      startDate: new Date().toLocaleDateString().split("/").reverse().join("-"),//.split("T")[0],
      endDate: new Date().toLocaleDateString().split("/").reverse().join("-")//.toISOString().split("T")[0],
    },
  });
  const triggerSubmit = () => {
    formRef.current.requestSubmit();
  };

  // Cargar todas las propiedades al montar el componente
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await PropertyService.getPropertyById(propertyId);
        setProperty(response);
      } catch (error) {
        console.error("Error al obtener la propiedad:", error);
        setProperty([]);
      }
    };
    const fetchUserData = async () => {
      try {
        const response = await getUserData(); 
        setUserData(response);
      } catch (error) {
        console.error("Error al obtener la data del usuario:", error);
        setUserData([]);
      }
    };

    fetchUserData();
    fetchProperty();
  }, []);

  useEffect(() => {
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
  }, [register]);

  const formValues = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
        const response = await ContractService.createContract({...data,
          signature: signatureSrc,
          fingerprint: fingerprintSrc
        });
        if (response) {
            setStep((prev) => prev + 1);
        } else {
            console.error("Error al crear el contrato.");
        }
    } catch (error) {
        console.error("Error en la creación de el contrato:", error);
    }
  });
  const nextStep = async () => {
    trigger("address")
    trigger("frequency")
    trigger("country")
    trigger("signature")
    trigger("fingerprint")
    trigger("termsandconditions")
    trigger("startDate")
    trigger("endDate")
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
            property={property}
            fingerprintSrc={fingerprintSrc}
            triggerSubmit={triggerSubmit}
            userData={userData}
          />
        )}
        {step === 3 && 
          <CreateContractStepThree
          />}
      </form>
    </div>
  );
};

export default CreateContract;
