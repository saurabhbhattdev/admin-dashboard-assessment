export default function ReviewCard({
  label,
  value,
}) {
  const formattedLabel = label
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());

  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-4 transition-all hover:border-cyan-500/20">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        {formattedLabel}
      </p>

      <p className="mt-2 break-words text-sm font-medium text-white">
        {value?.trim() ? value : "N/A"}
      </p>
    </div>
  );
}