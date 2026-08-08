import { ArrowDownIcon } from "./Icons";
import type { InstallPromptState } from "../lib/install";

export default function InstallPrompt({
  showPrompt,
  install,
  dismiss,
  deferred,
}: InstallPromptState) {
  if (!showPrompt) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto w-full max-w-5xl px-4 pb-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 border border-line bg-panel px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-accent text-ink">
              <ArrowDownIcon size={18} className="stroke-[2.5]" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold tracking-tight">Install FAVD</p>
              {deferred ? (
                <p className="truncate font-mono text-[11px] text-faint">
                  Offline support · one-tap launch
                </p>
              ) : (
                <p className="truncate font-mono text-[11px] text-faint">
                  Tap Share, then “Add to Home Screen”
                </p>
              )}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={dismiss}
              className="border border-line px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:bg-hover hover:text-foreground"
            >
              Not now
            </button>
            <button
              onClick={() => {
                if (deferred) void install();
                else dismiss();
              }}
              className="border border-line bg-accent px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-accent-hover"
            >
              {deferred ? "Install" : "Got it"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
