import { Loader2 } from "lucide-react";

export default function Spinner({
  text = "Building your dashboard...",
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#020617]">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-2xl" />

          {/* Static Ring */}
          <div className="absolute inset-0 rounded-full border border-white/10" />

          {/* Animated Ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-cyan-400 border-r-purple-400 animate-spin" />

          {/* Center Core */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/5 bg-[#0F172A] shadow-2xl">
            <Loader2
              className="h-6 w-6 animate-spin text-cyan-400"
              strokeWidth={2.5}
            />
          </div>
        </div>

        {/* Text */}
        <h2 className="mt-8 text-2xl font-semibold tracking-tight text-white">
          {text}
        </h2>
      </div>
    </div>
  );
}