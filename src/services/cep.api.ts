import axios from "axios";
import type { AxiosResponse } from "axios";
import type { AddressData } from "@/interfaces/adressInterface";

export const cepApi = axios.create({
  baseURL: "https://viacep.com.br/ws/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export async function fetchCep(cep: string): Promise<AxiosResponse<AddressData>> {
  return cepApi.get<AddressData>(`${cep}/json/`);
}

export default cepApi;