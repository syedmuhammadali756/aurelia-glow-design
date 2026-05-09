import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { ANNOUNCEMENT_MESSAGES } from "@/data/site";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("aurelia-announce-dismissed") === "1") {
      setDismissed(true);
    }
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ANNOUNCEMENT_MESSAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  if (dismissed) return null;

  return (
    <div className="relative bg-espresso text-ivory text-[11px] tracking-[0.18em] uppercase">
      <div className="container-luxe flex items-center justify-center py-2.5">
        <div className="relative h-4 overflow-hidden">
          {ANNOUNCEMENT_MESSAGES.map((msg, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-all duration-700 ease-out whitespace-nowrap"
              style={{
                opacity: i === idx ? 1 : 0,
                transform: `translateY(${(i - idx) * 100}%)`,
              }}
            >
              {msg}
            </div>
          ))}
          {/* Sizer */}
          <div className="invisible whitespace-nowrap">{ANNOUNCEMENT_MESSAGES[idx]}</div>
        </div>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => {
            setDismissed(true);
            sessionStorage.setItem("aurelia-announce-dismissed", "1");
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
