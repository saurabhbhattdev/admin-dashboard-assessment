import { useState } from "react";

export default function Field({ label, type = "text", value, onChange, error, optional }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
        {label}
        {optional && (
          <span className="rounded px-1.5 py-0.5 text-xs font-medium normal-case tracking-normal bg-white/5 text-slate-600">
            optional
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: error ? "rgba(239,68,68,0.05)" : focused ? "rgba(6,182,212,0.05)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${error ? "rgba(239,68,68,0.5)" : focused ? "rgba(6,182,212,0.45)" : "rgba(255,255,255,0.10)"}`,
          boxShadow: error || focused ? `0 0 0 3px ${error ? "rgba(239,68,68,0.08)" : "rgba(6,182,212,0.08)"}` : "none",
          outline: "none",
          transition: "all 0.2s",
        }}
        className="w-full rounded-xl px-4 py-3.5 text-sm font-medium text-white placeholder-slate-700"
      />

      {error && (
        <p className="flex items-center gap-1.5 text-xs font-medium text-rose-400">
          <span className="h-1 w-1 shrink-0 rounded-full bg-rose-400" />
          {error}
        </p>
      )}
    </div>
  );
}