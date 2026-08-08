import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import URLBar from "./components/URLBar";
import ResultPanel from "./components/ResultPanel";
import { fetchFormats, fetchPlatforms } from "./lib/api";
import type { FormatsResponse } from "./types";

export default function App() {
  const [formats, setFormats] = useState<FormatsResponse | null>(null);
  const [sourceUrl, setSourceUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [platformCount, setPlatformCount] = useState<number | null>(null);

  useEffect(() => {
    fetchPlatforms()
      .then(setPlatformCount)
      .catch(() => setPlatformCount(0));
  }, []);

  const handleFetch = useCallback(async (url: string) => {
    setLoading(true);
    setError(null);
    setFormats(null);
    try {
      const result = await fetchFormats(url);
      if (!result.success) throw new Error(result.data ? "Extraction failed" : "No media found");
      setFormats(result);
      setSourceUrl(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to reach the download service");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-ink text-foreground">
      <Header platformCount={platformCount} />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-16 sm:px-6 sm:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          Universal media downloader
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
          Every platform.
          <br />
          Every format.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
          Paste a link from any supported platform and pull a clean list of every downloadable
          video and audio format — with direct links, ready to go.
        </p>

        <div className="mt-10">
          <URLBar onFetch={handleFetch} loading={loading} />
        </div>

        {loading && (
          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-faint">
              <span>Extracting metadata</span>
              <span>yt-dlp engine</span>
            </div>
            <div className="relative h-px w-full overflow-hidden bg-line">
              <div className="absolute inset-y-0 w-1/3 bg-accent animate-[scan_1.4s_linear_infinite]" />
            </div>
          </div>
        )}

        {error && (
          <div className="mt-8 flex items-start gap-3 border border-danger/40 bg-danger/10 px-4 py-3">
            <span className="font-mono text-[11px] font-semibold tracking-widest text-danger">
              ERR
            </span>
            <p className="font-mono text-xs text-danger/90">{error}</p>
          </div>
        )}

        {formats && !loading && (
          <div className="mt-10">
            <ResultPanel
              formats={formats}
              sourceUrl={sourceUrl}
              onClose={() => setFormats(null)}
            />
          </div>
        )}
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-2 px-4 py-5 font-mono text-[11px] text-faint sm:flex-row sm:items-center sm:px-6">
          <span>
            {platformCount
              ? `${platformCount.toLocaleString()} supported platforms`
              : "yt-dlp powered"}
          </span>
          <span>Powered by yt-dlp — direct links expire after extraction</span>
        </div>
      </footer>
    </div>
  );
}
