import type { NfeFormInterface as NfeFormInterfaceEn } from "@/interfaces/formInterface";

export const initialValuesEn: NfeFormInterfaceEn = {
  issuer: {
    cpfCnpj: "",
    corporateName: "",
    tradeName: "",
    address: "",
    zipCode: "",
    phone: "",
    email: "",
    stateRegistration: "",
    municipalRegistration: "",
    taxRegime: "",
  },
  recipient: {
    cpfCnpj: "",
    corporateName: "",
    zipCode: "",
    address: "",
    city: "",
    stateRegistration: "",
    municipalRegistration: "",
    phone: "",
  },
  service: {
    serviceCode: "",
    description: "",
    unitValue: "",
    quantity: "",
    discount: "",
    createdAt: ""
  },
};