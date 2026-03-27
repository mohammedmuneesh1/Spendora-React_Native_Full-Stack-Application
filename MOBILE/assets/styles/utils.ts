// lib/utils.js
export function formatDate(dateString:string) {


  if(!dateString || !dateString.trim()) return '';
  // format date nicely
  // example: from this 👉 2025-05-20 to this 👉 May 20, 2025
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}




export const formatMoney = (value: number | string | undefined,type="default") => {
  const num = Number(value ?? 0);
  if (num === 0) return "0.00";
  // return `${num > 0 ? "+" : ""}${num.toFixed(2)}`;
  return `${num.toFixed(2)}`;
};