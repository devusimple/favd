import { ArrowDownIcon } from "./Icons";

interface HeaderProps {
  platformCount: number | null;
  canInstall: boolean;
  onInstall: () => void;
}

export default function Header({ platformCount, canInstall, onInstall }: HeaderProps) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center bg-accent text-ink">
            <ArrowDownIcon size={14} className="stroke-[2.5]" />
          </span>
          <span className="text-sm font-semibold tracking-tight">FAVD</span>
          <span className="hidden font-mono text-[11px] text-faint sm:inline">
            UNIVERSAL DOWNLOADER
          </span>
        </div>
        <div className="flex items-center gap-3">
          {canInstall && (
            <button
              onClick={onInstall}
              className="flex items-center gap-2 border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:bg-hover hover:text-foreground"
            >
              <ArrowDownIcon size={13} />
              Install
            </button>
          )}
          <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
            <span className="hidden text-faint md:inline">
              {platformCount ? `${platformCount.toLocaleString()} PLATFORMS` : "…"}
            </span>
            <span className="h-1.5 w-1.5 bg-ok" />
            <span>API ONLINE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
