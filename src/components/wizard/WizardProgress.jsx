export default function WizardProgress({
  step,
  totalSteps,
  stepTitles,
}) {
  const progressPercentage = Math.round(
    (step / totalSteps) * 100
  );

  return (
    <div className="rounded-3xl border border-white/5 bg-[#0F172A] p-6 shadow-xl">
      {/* Top Progress Info */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-white">
            Step {step} of {totalSteps}
          </p>

          <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">
            {stepTitles[step - 1]}
          </p>
        </div>

        <span className="text-sm font-bold text-cyan-400">
          {progressPercentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-3 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-cyan-500 transition-all duration-500"
          style={{
            width: `${progressPercentage}%`,
          }}
        />
      </div>

      {/* Step Indicators */}
      <div className="mt-6 grid grid-cols-4 gap-3">
        {stepTitles.map((title, index) => {
          const currentStep = index + 1;
          const isActive = currentStep === step;
          const isCompleted = currentStep < step;

          return (
            <div
              key={title}
              className={`rounded-2xl px-3 py-3 text-center text-xs font-semibold transition-all ${
                isCompleted
                  ? "bg-cyan-500 text-slate-950"
                  : isActive
                  ? "border border-cyan-500 bg-cyan-500/10 text-cyan-400"
                  : "bg-white/5 text-slate-500"
              }`}
            >
              {title}
            </div>
          );
        })}
      </div>
    </div>
  );
}