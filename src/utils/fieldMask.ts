export const dateMask = (date: string): string =>
  date
    .replace(/[^0-9]/g, "")
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})\d+?$/, "$1");

export const onlyNumberMask = (text: string): string => {
  return text?.replace(/[^0-9]/g, "")?.replace(/\D/g, "");
};
