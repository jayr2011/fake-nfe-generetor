import { useState } from "react";
import type { ReactNode } from "react";
import { ApiContext } from "./apiContext";
import api from "@/services/nfe.api";
import type { NfeFormInterface } from "@/interfaces/formInterface";

export function ApiProvider({ children }: { children: ReactNode }) {
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isErrorCreating, setIsErrorCreating] = useState<string | null>(null);

  async function createNfe(data: NfeFormInterface) {
    setIsLoadingCreate(true);
    setIsErrorCreating(null);
    const payload = {
      issuerData: { ...data.issuer },
      recipientData: { ...data.recipient },
      servicesDescription: {
        serviceCode: data.service.serviceCode,
        description: data.service.description,
        unitValue: String(data.service.unitValue),
        quantity: Number(data.service.quantity) || 0,
        discount: Number(data.service.discount) || 0,
      },
    };
    try {
      const response = await api.post("/create", payload, {
        responseType: "blob",
        headers: {
          Accept: "application/pdf",
        },
      });

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      const newWindow = window.open(pdfUrl, "_blank");

      if (!newWindow) {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `nfe-${Date.now()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      setTimeout(() => {
        window.URL.revokeObjectURL(pdfUrl);
      }, 1000);

    } catch (err) {
      setIsErrorCreating(`Erro ao criar NFe: ${err instanceof Error ? err.message : "Erro desconhecido"}`);
    } finally {
      setIsLoadingCreate(false);
    }
  }

  const value = {
    isLoadingCreate,
    isErrorCreating,
    createNfe,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}