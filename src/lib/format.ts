export function formatCount(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return "—";
  return new Intl.NumberFormat("en", {
    notation: n >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(n);
}

export function formatSize(mb: number | null | undefined): string {
  if (mb == null || Number.isNaN(mb)) return "—";
  return `${mb} MB`;
}

export function formatBitrate(abr: number | null | undefined): string {
  if (abr == null || Number.isNaN(abr)) return "—";
  return `${Math.round(abr)} K`;
}
