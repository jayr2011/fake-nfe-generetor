export interface IssuerData {
  cpfCnpj: string;
  corporateName: string;
  tradeName: string;
  address: string;
  zipCode: string;
  phone: string;
  email: string;
  stateRegistration: string;
  municipalRegistration: string;
  taxRegime: string;
}

export interface RecipientData {
  cpfCnpj: string;
  corporateName: string;
  zipCode: string;
  address: string;
  city: string;
  stateRegistration: string;
  municipalRegistration: string;
  phone: string;
}

export interface ServiceDescription {
  serviceCode: string;
  description: string;
  unitValue: string;
  quantity: string;
  discount: string;
}

export interface NfeFormInterface {
  issuer: IssuerData;
  recipient: RecipientData;
  service: ServiceDescription;
}