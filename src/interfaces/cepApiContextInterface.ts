import type { AddressData } from "./adressInterface";

export type CepField = "issuer" | "recipient";

export interface CepApiContextProps {
    issuerIsLoading: boolean;
    recipientIsLoading: boolean;
    issuerCepError: string | null;
    recipientCepError: string | null;
    issuerAddressData: AddressData | null;
    recipientAddressData: AddressData | null;
    fetchAddressData: (cep: string, field: CepField) => Promise<void>;
    clearCepErrors: () => void;
}
