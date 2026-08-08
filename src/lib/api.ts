import type { FormatsResponse } from "../types";

export const API_BASE = "https://jstk.vercel.app";

export async function fetchFormats(url: string, useCookies = false): Promise<FormatsResponse> {
  const params = new URLSearchParams({ url, use_cookies: String(useCookies) });
  const res = await fetch(`${API_BASE}/formats?${params}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`API responded with status ${res.status}`);
  return (await res.json()) as FormatsResponse;
}

export async function fetchPlatforms(): Promise<number> {
  try {
    const res = await fetch(`${API_BASE}/platforms`);
    if (!res.ok) return 0;
    const data = (await res.json()) as { success: boolean; total?: number };
    return data.total ?? 0;
  } catch {
    return 0;
  }
}
