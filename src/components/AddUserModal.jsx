import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { X, CheckCircle2, Loader2 } from 'lucide-react';

// 1. The Validation Rules
const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Must be a valid email'),
  role: yup.string().required('Role is required').oneOf(['Admin', 'Editor', 'Viewer']),
  status: yup.string().required('Status is required').oneOf(['Active', 'Inactive']),
  password: yup.string().required('Password is required').min(6, 'Must be at least 6 characters')
});

export default function AddUserModal({ isOpen, onClose, onAddUser }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 2. Setup the form hook
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { role: 'Viewer', status: 'Active' } // Sensible defaults
  });

  // Don't render anything if the modal is closed
  if (!isOpen) return null;

  // 3. Handle the submission
  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    // Simulate a 1-second network request
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true); // Show success state
      
      // Wait 1.5 seconds so the user can see the success message, then close and update table
      setTimeout(() => {
        onAddUser(data);
        setShowSuccess(false);
        reset(); // Clear the form
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Add New User</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {showSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in-95 duration-300">
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">User Added Successfully!</h3>
              <p className="text-gray-500 text-sm mt-1">They will now appear in your table.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  {...register('name')} 
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-shadow ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'}`}
                  placeholder="e.g. John Doe"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  {...register('email')} 
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-shadow ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'}`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Role & Status Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select {...register('role')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none bg-white">
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select {...register('status')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none bg-white">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
                <input 
                  type="password"
                  {...register('password')} 
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-shadow ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'}`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create User'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}