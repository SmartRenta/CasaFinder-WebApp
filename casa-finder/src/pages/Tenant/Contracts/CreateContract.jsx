import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import CreateContractStepOne from "./CreateContractStepOne.jsx";
import CreateContractStepTwo from "./CreateContractStepTwo.jsx";
import CreateContractStepThree from "./CreateContractStepThree.jsx";
import ContractService from "../../../services/contractService.js";
import { getUserIdFromCache } from "../../../utils/authUtils.js";
import { useParams } from "react-router-dom";
import PropertyService from "../../../services/propertyService.js"; 
import { getUserData } from "../../../services/userService.js"; 

const CreateContract = () => {
  const { propertyId, landlordId } = useParams();
  const [step, setStep] = useState(1);
  const [signatureSrc, setSignatureSrc] = useState(null);
  const [fingerprintSrc, setFingerprintSrc] = useState(null);
  const [property, setProperty] = useState(null);
  const [userData, setUserData] = useState(null);
  const formRef = useRef();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      landlordId,
      address: "",
      frequency: "",
      country: "",
      signature: "",
      fingerprint: "",
      password: "",
      termsandconditions: false,
      termsandconditions2: false,
      propertyId,
      tenantId: getUserIdFromCache(),
      startDate: new Date().toLocaleDateString().split("/").reverse().join("-"),
      endDate: new Date().toLocaleDateString().split("/").reverse().join("-"),
    },
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await PropertyService.getPropertyById(propertyId);
        setProperty(response);
      } catch (error) {
        console.error("Error al obtener la propiedad:", error);
      }
    };
    const fetchUserData = async () => {
      try {
        const response = await getUserData(); 
        setUserData(response);
      } catch (error) {
        console.error("Error al obtener la data del usuario:", error);
      }
    };
    fetchUserData();
    fetchProperty();
  }, [propertyId]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await ContractService.createContract({
        ...data,
        signature: signatureSrc,
        fingerprint: fingerprintSrc,
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
    await trigger();
    const isStepValid = Object.keys(errors).length === 0;
    if (isStepValid) {
      setStep((prev) => prev + 1);
    } else {
      alert("Por favor, completa los campos requeridos.");
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <form onSubmit={onSubmit} ref={formRef}>
        {step === 1 && (
          <CreateContractStepOne
            setValue={setValue}
            errors={errors}
            formValues={watch()}
            nextStep={nextStep}
            fingerprintSrc={fingerprintSrc}
            setFingerprintSrc={setFingerprintSrc}
            signatureSrc={signatureSrc}
            setSignatureSrc={setSignatureSrc}
          />
        )}
        {step === 2 && (
          <CreateContractStepTwo
            setValue={setValue}
            errors={errors}
            formValues={watch()}
            nextStep={nextStep}
            prevStep={prevStep}
            signatureSrc={signatureSrc}
            fingerprintSrc={fingerprintSrc}
            triggerSubmit={() => formRef.current.requestSubmit()}
            property={property}
            userData={userData}
          />
        )}
        {step === 3 && <CreateContractStepThree />}
      </form>
    </div>
  );
};

export default CreateContract;
