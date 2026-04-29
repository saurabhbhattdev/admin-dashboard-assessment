export default function InputField({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-300">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        className={`w-full rounded-2xl border px-4 py-3 text-white outline-none transition-all placeholder:text-slate-500 ${
          error
            ? "border-rose-500 bg-rose-500/5"
            : "border-white/10 bg-white/5 focus:border-cyan-500"
        }`}
      />

      {error && (
        <p className="text-sm text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}