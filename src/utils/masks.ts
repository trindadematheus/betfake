export const normalizeCurrency = (value: string) => {
  const numericValue = value.replace(/\D/g, "");

  const formattedValue = (Number(numericValue) / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedValue;
};

export const formatOdd = (input: string) => {
  const numericValue = input.replace(/\D/g, "");

  const formattedValue = (Number(numericValue) / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedValue.replace(",", ".");
};

export function parseNumber(str: string) {
  return parseFloat(str.replace(/\./g, "").replace(",", "."));
}
