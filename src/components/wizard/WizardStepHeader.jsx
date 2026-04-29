export default function WizardStepHeader({
  title,
  description,
}) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        {description}
      </p>
    </div>
  );
}