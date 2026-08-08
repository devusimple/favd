import { useState } from "react";
import { ArrowDownIcon, CheckIcon, CopyIcon } from "./Icons";
import type { MediaFormat, VideoFormat } from "../types";
import { formatBitrate, formatSize } from "../lib/format";
import { API_BASE } from "../lib/api";

function streamUrl(sourceUrl: string, format: MediaFormat) {
  const params = new URLSearchParams({ url: sourceUrl, format_id: format.format_id });
  return `${API_BASE}/stream?${params}`;
}

function isVideo(format: MediaFormat): format is VideoFormat {
  return "resolution" in format;
}

export default function FormatRow({ format, sourceUrl }: { format: MediaFormat; sourceUrl: string }) {
  const [copied, setCopied] = useState(false);

  const primary = isVideo(format)
    ? format.resolution || (format.width ? `${format.height}p` : "—")
    : formatBitrate(format.abr);

  const label = isVideo(format)
    ? `${format.ext.toUpperCase()}${format.has_audio ? "" : " · VIDEO ONLY"}`
    : `${format.ext.toUpperCase()} · AUDIO`;

  const codec = isVideo(format)
    ? format.acodec && format.acodec !== "none"
      ? `${format.vcodec} · ${format.acodec}`
      : format.vcodec
    : format.acodec;

  const size = formatSize(format.filesize_mb);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(format.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-line px-4 py-3 transition-colors last:border-b-0 hover:bg-raised sm:px-5">
      <div className="flex min-w-0 items-center gap-4">
        <span className="w-14 shrink-0 font-mono text-sm font-semibold text-foreground">
          {primary}
        </span>
        <div className="min-w-0">
          <p className="truncate font-mono text-[11px] uppercase tracking-widest text-muted">
            {label}
          </p>
          <p className="truncate font-mono text-[11px] text-faint">{codec}</p>
        </div>
      </div>

      <span className="hidden font-mono text-xs text-faint sm:inline">{format.format_id}</span>
      <span className="w-16 text-right font-mono text-xs text-muted">{size}</span>

      <div className="flex items-center gap-2">
        <button
          onClick={copy}
          className="border border-line p-2 text-muted transition-colors hover:border-line-strong hover:text-foreground"
          title="Copy direct link"
        >
          {copied ? <CheckIcon size={14} className="text-ok" /> : <CopyIcon size={14} />}
        </button>
        <a
          href={streamUrl(sourceUrl, format)}
          className="border border-line bg-accent p-2 text-ink transition-colors hover:bg-accent-hover"
          title="Download"
        >
          <ArrowDownIcon size={14} />
        </a>
      </div>
    </div>
  );
}
