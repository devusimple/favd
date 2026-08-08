import { useState, type ReactNode } from "react";
import { ClockIcon, CloseIcon, EyeIcon, GlobeIcon, ThumbsUpIcon } from "./Icons";
import type { FormatsResponse, MediaFormat } from "../types";
import { formatCount } from "../lib/format";
import FormatRow from "./FormatRow";

interface ResultPanelProps {
  formats: FormatsResponse;
  sourceUrl: string;
  onClose: () => void;
}

type Tab = "video" | "audio";

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3">
      <span className="text-faint">{icon}</span>
      <span className="hidden font-mono text-[10px] tracking-widest text-faint lg:inline">
        {label}
      </span>
      <span className="font-mono text-xs text-foreground">{value}</span>
    </div>
  );
}

export default function ResultPanel({ formats, sourceUrl, onClose }: ResultPanelProps) {
  const [tab, setTab] = useState<Tab>("video");
  const data = formats.data;
  const videoFormats = data.video_formats ?? [];
  const audioFormats = data.audio_formats ?? [];

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "video", label: "Video", count: videoFormats.length },
    { id: "audio", label: "Audio", count: audioFormats.length },
  ];

  const rows: MediaFormat[] = tab === "video" ? videoFormats : audioFormats;

  return (
    <section className="border border-line bg-panel">
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="h-1.5 w-1.5 shrink-0 bg-accent" />
          <p className="truncate font-mono text-xs text-muted">{sourceUrl}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted sm:inline">
            {data.extractor}
          </span>
          <button
            onClick={onClose}
            className="border border-line p-1.5 text-muted transition-colors hover:bg-hover hover:text-foreground"
            aria-label="Close results"
          >
            <CloseIcon size={14} />
          </button>
        </div>
      </div>

      <div className="grid border-b border-line md:grid-cols-[300px_1fr]">
        <div className="relative">
          {data.thumbnail ? (
            <img
              src={data.thumbnail}
              alt=""
              loading="lazy"
              className="aspect-video w-full object-cover md:h-full"
            />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center bg-raised font-mono text-[11px] text-faint md:h-full">
              NO THUMBNAIL
            </div>
          )}
          <div className="absolute bottom-2 left-2 bg-ink/85 px-1.5 py-0.5 font-mono text-[11px] text-foreground">
            {data.duration_formatted}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 p-5 sm:p-6">
          <div>
            <h2 className="text-lg font-semibold leading-snug tracking-tight sm:text-xl">
              {data.title}
            </h2>
            <p className="mt-2 font-mono text-xs text-faint">{data.uploader}</p>
          </div>
          <div className="flex flex-wrap divide-x divide-line border border-line">
            <Stat icon={<ClockIcon size={14} />} label="DURATION" value={data.duration_formatted} />
            <Stat icon={<EyeIcon size={14} />} label="VIEWS" value={formatCount(data.view_count)} />
            <Stat icon={<ThumbsUpIcon size={14} />} label="LIKES" value={formatCount(data.like_count)} />
            <Stat icon={<GlobeIcon size={14} />} label="SOURCE" value={data.extractor} />
          </div>
        </div>
      </div>

      <div className="flex border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 border-r border-line px-5 py-3 font-mono text-[11px] uppercase tracking-widest transition-colors ${
              tab === t.id ? "bg-ink text-foreground" : "text-faint hover:bg-raised hover:text-foreground"
            }`}
          >
            {t.label}
            <span className={tab === t.id ? "text-accent" : "text-faint"}>{t.count}</span>
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <p className="px-5 py-12 text-center font-mono text-xs text-faint">NO FORMATS AVAILABLE</p>
      ) : (
        <div className="max-h-[480px] overflow-y-auto">
          {rows.map((f) => (
            <FormatRow key={f.format_id} format={f} sourceUrl={sourceUrl} />
          ))}
        </div>
      )}
    </section>
  );
}
