export default function WizardNavigation({
  step,
  totalSteps,
  onBack,
  onNext,
  onSubmit,
  isSubmitting = false,
}) {
  const isFirstStep = step === 1;
  const isLastStep = step === totalSteps;

  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        disabled={isFirstStep || isSubmitting}
        className="rounded-2xl bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Back
      </button>

      {/* Next / Submit */}
      {isLastStep ? (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="rounded-2xl bg-emerald-500 px-8 py-3 text-sm font-bold text-slate-950 transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
          className="rounded-2xl bg-cyan-500 px-8 py-3 text-sm font-bold text-slate-950 transition-all hover:scale-[1.02]"
        >
          Next
        </button>
      )}
    </div>
  );
}