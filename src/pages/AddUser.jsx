import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddUser() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    try {
      console.log("New User:", data);

      toast.success("User added successfully!");

      reset();
    } catch (error) {
         console.log(error);
      toast.error("Failed to add user.");
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-[3rem] border border-white/5 bg-[#0F172A] p-8 shadow-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">
          Add New User
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Create and provision a new system user.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <FormField
          label="Name"
          error={errors.name?.message}
          input={
            <input
              type="text"
              placeholder="Enter full name"
              {...register("name", {
                required: "Name is required",
              })}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            />
          }
        />

        {/* Email */}
        <FormField
          label="Email"
          error={errors.email?.message}
          input={
            <input
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            />
          }
        />

        {/* Role */}
        <FormField
          label="Role"
          error={errors.role?.message}
          input={
            <select
              {...register("role", {
                required: "Role is required",
              })}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
            </select>
          }
        />

        {/* Status */}
        <FormField
          label="Status"
          error={errors.status?.message}
          input={
            <select
              {...register("status", {
                required: "Status is required",
              })}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          }
        />

        {/* Password */}
        <FormField
          label="Password"
          error={errors.password?.message}
          input={
            <input
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            />
          }
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-cyan-500 px-6 py-4 font-bold text-slate-950 transition-all hover:scale-[1.02] disabled:opacity-50"
        >
          {isSubmitting ? "Creating User..." : "Add User"}
        </button>
      </form>
    </div>
  );
}

function FormField({ label, input, error }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-300">
        {label}
      </label>

      {input}

      {error && (
        <p className="mt-2 text-sm text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}