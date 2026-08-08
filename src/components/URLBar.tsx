import { useRef, useState } from "react";
import { ArrowDownIcon, ClipboardPasteIcon, LinkIcon, SpinnerIcon } from "./Icons";

interface URLBarProps {
  onFetch: (url: string) => void;
  loading: boolean;
}

export default function URLBar({ onFetch, loading }: URLBarProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setValue(text);
        inputRef.current?.focus();
      }
    } catch {
      /* clipboard blocked — paste manually */
    }
  };

  const submit = () => {
    if (!value.trim() || loading) return;
    onFetch(value.trim());
  };

  return (
    <div>
      <div className="grid grid-cols-1 border border-line bg-panel sm:grid-cols-[1fr_auto_auto]">
        <div className="flex items-center gap-3 px-4">
          <LinkIcon size={16} className="shrink-0 text-faint" />
          <input
            ref={inputRef}
            type="url"
            inputMode="url"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="https://youtube.com/watch?v=…"
            className="w-full bg-transparent py-4 font-mono text-sm text-foreground placeholder:text-faint focus:outline-none"
          />
        </div>

        <button
          onClick={handlePaste}
          disabled={loading}
          className="flex items-center justify-center gap-2 border-t border-line px-4 py-4 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:bg-hover hover:text-foreground disabled:opacity-40 sm:border-l sm:border-t-0"
        >
          <ClipboardPasteIcon size={15} />
          <span className="hidden sm:inline">Paste</span>
        </button>

        <button
          onClick={submit}
          disabled={loading || !value.trim()}
          className="flex items-center justify-center gap-2 border-t border-line bg-accent px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40 sm:border-l sm:border-t-0"
        >
          {loading ? (
            <>
              <SpinnerIcon size={15} />
              Extracting
            </>
          ) : (
            <>
              Fetch
              <ArrowDownIcon size={14} />
            </>
          )}
        </button>
      </div>

      <p className="mt-3 font-mono text-[11px] text-faint">
        WORKS ON YOUTUBE · TIKTOK · INSTAGRAM · X · VIMEO · REDDIT — AND 1,700+ MORE
      </p>
    </div>
  );
}
