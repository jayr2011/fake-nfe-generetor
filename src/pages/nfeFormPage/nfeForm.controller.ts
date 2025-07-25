import { useState, useContext, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { NfeFormInterface as NfeFormInterfaceEn } from "@/interfaces/formInterface";
import { initialValuesEn as initialValuesEn } from "./constants/nfeFormInitialValues";
import { AlertContext } from "@/context/alertContext/AlertContext";
import { maskCpfCnpj, maskCep, maskPhone, isValidCpf, isValidCnpj, maskInscricaoEstadualRS, maskInscricaoMunicipalPortoAlegre } from "@/lib/regex";
import { useCepApi } from "@/context/cepApiContext/CepApiContext";
import { useApi } from "@/context/apiContext/apiContext";

export function handleNfeFormChange(
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setValues: React.Dispatch<React.SetStateAction<NfeFormInterfaceEn>>,
  fetchCepData?: (cep: string, field: "issuer" | "recipient") => Promise<void>
) {
  const { name, value } = event.target;
  if (name === "issuer.cpfCnpj" || name === "recipient.cpfCnpj") {
    const maskedValue = maskCpfCnpj(value);
    if (name.startsWith("issuer.")) {
      const field = name.replace("issuer.", "");
      setValues((prev) => ({
        ...prev,
        issuer: {
          ...prev.issuer,
          [field]: maskedValue,
        },
      }));
    } else if (name.startsWith("recipient.")) {
      const field = name.replace("recipient.", "");
      setValues((prev) => ({
        ...prev,
        recipient: {
          ...prev.recipient,
          [field]: maskedValue,
        },
      }));
    }
    return;
  }
  if (name === "issuer.zipCode" || name === "recipient.zipCode") {
    const maskedValue = maskCep(value);
    if (name.startsWith("issuer.")) {
      const field = name.replace("issuer.", "");
      setValues((prev) => ({
        ...prev,
        issuer: {
          ...prev.issuer,
          [field]: maskedValue,
        },
      }));
      if (maskedValue.length === 9 && fetchCepData) {
        fetchCepData(maskedValue.replace(/\D/g, ""), "issuer");
      }
    } else if (name.startsWith("recipient.")) {
      const field = name.replace("recipient.", "");
      setValues((prev) => ({
        ...prev,
        recipient: {
          ...prev.recipient,
          [field]: maskedValue,
        },
      }));
      if (maskedValue.length === 9 && fetchCepData) {
        fetchCepData(maskedValue.replace(/\D/g, ""), "recipient");
      }
    }
    return;
  }
  if (name === "issuer.phone" || name === "recipient.phone") {
    const maskedValue = maskPhone(value);
    if (name.startsWith("issuer.")) {
      const field = name.replace("issuer.", "");
      setValues((prev) => ({
        ...prev,
        issuer: {
          ...prev.issuer,
          [field]: maskedValue,
        },
      }));
    } else if (name.startsWith("recipient.")) {
      const field = name.replace("recipient.", "");
      setValues((prev) => ({
        ...prev,
        recipient: {
          ...prev.recipient,
          [field]: maskedValue,
        },
      }));
    }
    return;
  }
  if (name === "issuer.stateRegistration" || name === "recipient.stateRegistration") {
    const maskedValue = maskInscricaoEstadualRS(value);
    if (name.startsWith("issuer.")) {
      const field = name.replace("issuer.", "");
      setValues((prev) => ({
        ...prev,
        issuer: {
          ...prev.issuer,
          [field]: maskedValue,
        },
      }));
    } else if (name.startsWith("recipient.")) {
      const field = name.replace("recipient.", "");
      setValues((prev) => ({
        ...prev,
        recipient: {
          ...prev.recipient,
          [field]: maskedValue,
        },
      }));
    }
    return;
  }
  if (name === "issuer.municipalRegistration" || name === "recipient.municipalRegistration") {
    const maskedValue = maskInscricaoMunicipalPortoAlegre(value);
    if (name.startsWith("issuer.")) {
      const field = name.replace("issuer.", "");
      setValues((prev) => ({
        ...prev,
        issuer: {
          ...prev.issuer,
          [field]: maskedValue,
        },
      }));
    } else if (name.startsWith("recipient.")) {
      const field = name.replace("recipient.", "");
      setValues((prev) => ({
        ...prev,
        recipient: {
          ...prev.recipient,
          [field]: maskedValue,
        },
      }));
    }
    return;
  }
  if (name.startsWith("issuer.")) {
    const field = name.replace("issuer.", "");
    setValues((prev) => ({
      ...prev,
      issuer: {
        ...prev.issuer,
        [field]: value,
      },
    }));
  } else if (name.startsWith("recipient.")) {
    const field = name.replace("recipient.", "");
    setValues((prev) => ({
      ...prev,
      recipient: {
        ...prev.recipient,
        [field]: value,
      },
    }));
  } else if (name.startsWith("service.")) {
    const field = name.replace("service.", "");
    let newValue = value;
    // Máscara de moeda para unitValue
    if (field === "unitValue") {
      const onlyDigits = value.replace(/\D/g, "");
      const number = parseFloat(onlyDigits) / 100;
      newValue = isNaN(number) ? "" : number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
    setValues((prev) => ({
      ...prev,
      service: {
        ...prev.service,
        [field]: newValue,
      },
    }));
  } else {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
}

export function useNfeFormController() {
  const [values, setValues] = useState<NfeFormInterfaceEn>(initialValuesEn);
  const [useConfirmAlert, setConfirmAlert] = useState(false);
  const [issuerCpfError, setIssuerCpfError] = useState<string | null>(null);
  const [recipientCpfError, setRecipientCpfError] = useState<string | null>(null);
  const [recipientCityDisabled, setRecipientCityDisabled] = useState(false);
  const { createNfe, isLoadingCreate, isErrorCreating } = useApi();
  const alertContext = useContext(AlertContext);
  const {
    fetchAddressData,
    issuerAddressData,
    recipientAddressData,
    issuerIsLoading,
    recipientIsLoading,
    issuerCepError,
    recipientCepError,
    clearCepErrors,
  } = useCepApi();

  if (!alertContext) {
    throw new Error("AlertContext not provided.");
  }
  const { open, close, isOpen } = alertContext;

  useEffect(() => {
    if (
      recipientAddressData &&
      recipientAddressData.localidade &&
      values.recipient.zipCode.replace(/\D/g, "").length === 8 &&
      !values.recipient.city
    ) {
      setValues((prev) => ({
        ...prev,
        recipient: {
          ...prev.recipient,
          city: recipientAddressData.localidade,
        },
      }));
      setRecipientCityDisabled(true);
    }
  }, [recipientAddressData, values.recipient.zipCode, values.recipient.city]);

  useEffect(() => {
    if (values.recipient.zipCode.replace(/\D/g, "").length !== 8) {
      setRecipientCityDisabled(false);
    }
  }, [values.recipient.zipCode]);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    if (name === "issuer.cpfCnpj") {
      const digits = value.replace(/\D/g, "");
      if (digits.length === 11 && !isValidCpf(digits)) {
        setIssuerCpfError("Invalid CPF");
      } else if (digits.length === 14 && !isValidCnpj(digits)) {
        setIssuerCpfError("Invalid CNPJ");
      } else {
        setIssuerCpfError(null);
      }
    }
    if (name === "recipient.cpfCnpj") {
      const digits = value.replace(/\D/g, "");
      if (digits.length === 11 && !isValidCpf(digits)) {
        setRecipientCpfError("Invalid CPF");
      } else if (digits.length === 14 && !isValidCnpj(digits)) {
        setRecipientCpfError("Invalid CNPJ");
      } else {
        setRecipientCpfError(null);
      }
    }
    handleNfeFormChange(event, setValues, fetchAddressData);
  }

  function resetForm() {
    setValues(initialValuesEn);
    clearCepErrors();
    setIssuerCpfError(null);
    setRecipientCpfError(null);
  }

  function handleResetClick() {
    open();
  }

  function handleConfirmReset() {
    resetForm();
    close();
  }

  function handleConfirmNoteCriation(values: NfeFormInterfaceEn) {
    setConfirmAlert(false);
    createNfe(values);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    handleConfirmNoteCriation(values);
  }

  function handleOpenConfirmAlert() {
    setConfirmAlert(true);
  }

  function isConfirmAlert() {
    return useConfirmAlert;
  }

  function closeConfirmAlert() {
    setConfirmAlert(false);
  }

  return {
    closeConfirmAlert,
    isConfirmAlert,
    handleOpenConfirmAlert,
    handleConfirmNoteCriation,
    isLoadingCreate,
    isErrorCreating,
    values,
    handleChange,
    handleSubmit,
    handleResetClick,
    handleConfirmReset,
    isOpen,
    close,
    open,
    issuerAddressData,
    recipientAddressData,
    issuerIsLoading,
    recipientIsLoading,
    issuerCepError,
    recipientCepError,
    recipientCityDisabled,
    issuerCpfError,
    recipientCpfError,
  };
}
