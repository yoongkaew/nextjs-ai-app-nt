// src/lib/format.ts
// Shared formatters for the admin dashboard (and reusable elsewhere).

const thbFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
});

export function formatTHB(value: number): string {
  return thbFormatter.format(value);
}

const numberFormatter = new Intl.NumberFormat("th-TH");

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

const dateFormatter = new Intl.DateTimeFormat("th-TH", {
  dateStyle: "medium",
});

export function formatDate(value: Date | null): string {
  return value ? dateFormatter.format(value) : "—";
}
