import { describe, it, expect } from "vitest";
import {
  maskCpfCnpj,
  maskCep,
  maskPhone,
  isValidCpf,
  isValidCnpj,
} from "../../../src/lib/regex";

describe("maskCpfCnpj", () => {
  it("should correctly mask CPF", () => {
    expect(maskCpfCnpj("12345678901")).toBe("123.456.789-01");
  });
  it("should correctly mask CNPJ", () => {
    expect(maskCpfCnpj("12345678000199")).toBe("12.345.678/0001-99");
  });
  it("should return empty string for empty input", () => {
    expect(maskCpfCnpj("")).toBe("");
  });
});

describe("maskCep", () => {
  it("should correctly mask CEP", () => {
    expect(maskCep("12345678")).toBe("12345-678");
  });
  it("should return empty string for empty input", () => {
    expect(maskCep("")).toBe("");
  });
});

describe("maskPhone", () => {
  it("should correctly mask landline phone", () => {
    expect(maskPhone("1198765432")).toBe("(11) 9876-5432");
  });
  it("should correctly mask mobile phone", () => {
    expect(maskPhone("11998765432")).toBe("(11) 99876-5432");
  });
  it("should return empty string for empty input", () => {
    expect(maskPhone("")).toBe("");
  });
});

describe("isValidCpf", () => {
  it("should validate a valid CPF", () => {
    expect(isValidCpf("52998224725")).toBe(true);
  });
  it("should invalidate an invalid CPF", () => {
    expect(isValidCpf("12345678900")).toBe(false);
  });
  it("should invalidate CPFs with all identical digits", () => {
    expect(isValidCpf("11111111111")).toBe(false);
  });
});

describe("isValidCnpj", () => {
  it("should validate a valid CNPJ", () => {
    expect(isValidCnpj("11222333000181")).toBe(true);
  });
  it("should invalidate an invalid CNPJ", () => {
    expect(isValidCnpj("12345678000100")).toBe(false);
  });
    it("should invalidate CNPJs with all identical digits", () => {
      expect(isValidCnpj("11111111111111")).toBe(false);
    });
  });