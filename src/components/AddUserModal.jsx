import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";

// 1. Logic: In functions ko component ke bahar rakho taaki React render error na de
const generateUniqueId = () => Math.floor(Math.random() * 9000) + 100;

const getFormattedDate = () => {
  return new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export default function AddUserModal({ isOpen, onClose, onUserAdded }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      // Simulate network request
      await new Promise((res) => setTimeout(res, 800));
      
      // 2. Logic: Ab naya user object banate waqt bahar ke functions call karo
      const newUser = {
        id: generateUniqueId(), 
        name: data.name,
        email: data.email,
        role: data.role,
        status: data.status,
        createdDate: getFormattedDate()
      };

      onUserAdded(newUser); // Parent state ko update karega
      toast.success("User added successfully!");
      reset();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add user. Please try again.");
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      style={{ background: "rgba(2, 6, 23, 0.8)", backdropFilter: "blur(8px)" }}
    >
      <div className="wiz-glass relative w-full max-w-lg max-h-[95vh] overflow-y-auto rounded-3xl p-6 shadow-2xl sm:rounded-[2rem] sm:p-8 animate-in zoom-in-95 duration-200 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        <button 
          onClick={onClose} 
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white sm:right-6 sm:top-6"
        >
          <X size={18} />
        </button>

        <div className="mb-6 pr-10 sm:mb-8">
          <h2 className="wiz-heading text-2xl text-white sm:text-3xl">
            Add New User
          </h2>
          <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">
            Create and provision a new system user profile.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
          
          <FormField label="Name" error={errors.name?.message}>
            <input
              type="text"
              placeholder="Enter full name"
              {...register("name", { required: "Name is required" })}
              className={`w-full rounded-xl border px-4 py-3 text-[13px] font-medium text-white placeholder-slate-500 outline-none transition-all duration-200 ${
                errors.name 
                  ? "border-rose-500/50 bg-rose-500/5 focus:border-rose-500/50 focus:ring-4 focus:ring-rose-500/10" 
                  : "border-white/10 bg-white/5 hover:border-white/20 focus:border-cyan-500/50 focus:bg-cyan-500/5 focus:ring-4 focus:ring-cyan-500/10"
              }`}
            />
          </FormField>

          <FormField label="Email" error={errors.email?.message}>
            <input
              type="email"
              placeholder="Enter email address"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
              })}
              className={`w-full rounded-xl border px-4 py-3 text-[13px] font-medium text-white placeholder-slate-500 outline-none transition-all duration-200 ${
                errors.email 
                  ? "border-rose-500/50 bg-rose-500/5 focus:border-rose-500/50 focus:ring-4 focus:ring-rose-500/10" 
                  : "border-white/10 bg-white/5 hover:border-white/20 focus:border-cyan-500/50 focus:bg-cyan-500/5 focus:ring-4 focus:ring-cyan-500/10"
              }`}
            />
          </FormField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <FormField label="Role" error={errors.role?.message}>
              <div className="relative">
                <select
                  {...register("role", { required: "Role is required" })}
                  className={`w-full appearance-none rounded-xl border px-4 py-3 text-[13px] font-medium text-white outline-none transition-all duration-200 ${
                    errors.role 
                      ? "border-rose-500/50 bg-rose-500/5 focus:border-rose-500/50 focus:ring-4 focus:ring-rose-500/10" 
                      : "border-white/10 bg-white/5 hover:border-white/20 focus:border-cyan-500/50 focus:bg-cyan-500/5 focus:ring-4 focus:ring-cyan-500/10"
                  }`}
                >
                  <option className="bg-[#0C1221]" value="">Select Role</option>
                  <option className="bg-[#0C1221]" value="Admin">Admin</option>
                  <option className="bg-[#0C1221]" value="Manager">Manager</option>
                  <option className="bg-[#0C1221]" value="Developer">Developer</option>
                  <option className="bg-[#0C1221]" value="Designer">Designer</option>
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">▼</span>
              </div>
            </FormField>

            <FormField label="Status" error={errors.status?.message}>
              <div className="relative">
                <select
                  {...register("status", { required: "Status is required" })}
                  className={`w-full appearance-none rounded-xl border px-4 py-3 text-[13px] font-medium text-white outline-none transition-all duration-200 ${
                    errors.status 
                      ? "border-rose-500/50 bg-rose-500/5 focus:border-rose-500/50 focus:ring-4 focus:ring-rose-500/10" 
                      : "border-white/10 bg-white/5 hover:border-white/20 focus:border-cyan-500/50 focus:bg-cyan-500/5 focus:ring-4 focus:ring-cyan-500/10"
                  }`}
                >
                  <option className="bg-[#0C1221]" value="">Select Status</option>
                  <option className="bg-[#0C1221]" value="Active">Active</option>
                  <option className="bg-[#0C1221]" value="Inactive">Inactive</option>
                  <option className="bg-[#0C1221]" value="Pending">Pending</option>
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">▼</span>
              </div>
            </FormField>
          </div>

          <FormField label="Password" error={errors.password?.message}>
            <input
              type="password"
              placeholder="Enter secure password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters required" },
              })}
              className={`w-full rounded-xl border px-4 py-3 text-[13px] font-medium text-white placeholder-slate-500 outline-none transition-all duration-200 ${
                errors.password 
                  ? "border-rose-500/50 bg-rose-500/5 focus:border-rose-500/50 focus:ring-4 focus:ring-rose-500/10" 
                  : "border-white/10 bg-white/5 hover:border-white/20 focus:border-cyan-500/50 focus:bg-cyan-500/5 focus:ring-4 focus:ring-cyan-500/10"
            }`}
            />
          </FormField>

          <div className="mt-6 flex flex-col-reverse justify-end gap-3 border-t border-white/5 pt-5 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full rounded-xl px-5 py-3 text-[13px] font-bold text-slate-300 transition-all hover:bg-white/5 hover:text-white disabled:opacity-50 sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="wiz-btn flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-[13px] font-bold text-white transition-all disabled:opacity-50 sm:w-auto sm:min-w-[140px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating...
                </>
              ) : (
                "Add User"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({ label, children, error }) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-rose-400">
          <span className="h-1 w-1 shrink-0 rounded-full bg-rose-400" />
          {error}
        </p>
      )}
    </div>
  );
}