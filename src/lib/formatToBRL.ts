export function formatToBRL(value: string | number): string {
  const number = typeof value === "string"
    ? Number(value.replace(/[^\d]/g, "")) / 100
    : value;
  if (isNaN(number)) return "";
  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
