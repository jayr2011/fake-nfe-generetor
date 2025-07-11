import { useState } from "react";
import type { ReactNode } from "react";
import { CepApiContext } from "./CepApiContext";
import { type AddressData } from "@/interfaces/adressInterface";
import { fetchCep } from "@/services/cep.api";

type CepField = "issuer" | "recipient";

export function CepApiProvider({ children }: { children: ReactNode }) {
    const [issuerAddressData, setIssuerAddressData] = useState<AddressData | null>(null);
    const [recipientAddressData, setRecipientAddressData] = useState<AddressData | null>(null);
    const [issuerIsLoading, setIssuerIsLoading] = useState<boolean>(false);
    const [recipientIsLoading, setRecipientIsLoading] = useState<boolean>(false);
    const [issuerCepError, setIssuerCepError] = useState<string | null>(null);
    const [recipientCepError, setRecipientCepError] = useState<string | null>(null);

    async function fetchAddressData(cep: string, field: CepField) {
        if (field === "issuer") {
            setIssuerIsLoading(true);
            setIssuerCepError(null);
        } else {
            setRecipientIsLoading(true);
            setRecipientCepError(null);
        }
        try {
            const response = await fetchCep(cep);
            if (!response.data || response.data.erro) {
                if (field === "issuer") {
                    setIssuerAddressData(null);
                    setIssuerCepError("endereço incorreto");
                } else {
                    setRecipientAddressData(null);
                    setRecipientCepError("endereço incorreto");
                }
            } else {
                if (field === "issuer") {
                    setIssuerAddressData(response.data);
                } else {
                    setRecipientAddressData(response.data);
                }
            }
        } catch {
            if (field === "issuer") {
                setIssuerAddressData(null);
                setIssuerCepError("endereço incorreto");
            } else {
                setRecipientAddressData(null);
                setRecipientCepError("endereço incorreto");
            }
        } finally {
            if (field === "issuer") {
                setIssuerIsLoading(false);
            } else {
                setRecipientIsLoading(false);
            }
        }
    }

    function clearCepErrors() {
        setIssuerCepError(null);
        setRecipientCepError(null);
    }

    const value = {
        issuerIsLoading,
        recipientIsLoading,
        issuerCepError,
        recipientCepError,
        issuerAddressData,
        recipientAddressData,
        fetchAddressData,
        clearCepErrors,
    };

    return (
        <CepApiContext.Provider value={value}>
            {children}
        </CepApiContext.Provider>
    );
}