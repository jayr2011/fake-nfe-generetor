export function maskCpfCnpj(value: string): string {
  if (!value) return "";
  let digits = value.replace(/\D/g, "");
  if (digits.length <= 11) {
    digits = digits.slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  digits = digits.slice(0, 14);
  return digits
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

export function maskCep(value: string): string {
  if (!value) return "";
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return digits.replace(/(\d{5})(\d{1,3})$/, "$1-$2");
}

export function maskPhone(value: string): string {
  if (!value) return "";
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    // (99) 9999-9999
    return digits
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
  // (99) 99999-9999
  return digits
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export function isValidCpf(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11 || /^([0-9])\1+$/.test(digits)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(digits.charAt(i)) * (10 - i);
  let firstCheck = (sum * 10) % 11;
  if (firstCheck === 10 || firstCheck === 11) firstCheck = 0;
  if (firstCheck !== Number(digits.charAt(9))) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(digits.charAt(i)) * (11 - i);
  let secondCheck = (sum * 10) % 11;
  if (secondCheck === 10 || secondCheck === 11) secondCheck = 0;
  return secondCheck === Number(digits.charAt(10));
}

export function isValidCnpj(cnpj: string): boolean {
  const digits = cnpj.replace(/\D/g, "");
  if (digits.length !== 14 || /^([0-9])\1+$/.test(digits)) return false;
  let length = digits.length - 2;
  let numbers = digits.substring(0, length);
  const verifiers = digits.substring(length);
  let sum = 0;
  let pos = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += Number(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== Number(verifiers.charAt(0))) return false;
  length = length + 1;
  numbers = digits.substring(0, length);
  sum = 0;
  pos = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += Number(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === Number(verifiers.charAt(1));
}

export function maskInscricaoEstadualRS(value: string): string {
  const onlyNumbers = value.replace(/\D/g, "").slice(0, 12);
  if (!onlyNumbers.startsWith("1")) return onlyNumbers;
  // Aplica máscara progressiva conforme a quantidade de dígitos
  let masked = onlyNumbers;
  if (onlyNumbers.length > 1) masked = masked.replace(/^(\d)(\d{0,3})/, "$1.$2");
  if (onlyNumbers.length > 4) masked = masked.replace(/^(\d)\.(\d{3})(\d{0,3})/, "$1.$2.$3");
  if (onlyNumbers.length > 7) masked = masked.replace(/^(\d)\.(\d{3})\.(\d{3})(\d{0,5})/, "$1.$2.$3.$4");
  return masked;
}

export function maskInscricaoMunicipalPortoAlegre(value: string): string {
  const onlyNumbers = value.replace(/\D/g, "").slice(0, 7);
  if (onlyNumbers.length <= 6) return onlyNumbers;
  return onlyNumbers.replace(/(\d{6})(\d)/, "$1-$2");
}
