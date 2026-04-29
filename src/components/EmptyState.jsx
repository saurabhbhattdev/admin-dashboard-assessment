import { FolderOpen } from 'lucide-react';

export default function EmptyState({ title = "No data found", description = "Get started by adding a new record." }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
        <FolderOpen className="w-6 h-6 text-gray-400" />
      </div>
      <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm">{description}</p>
    </div>
  );
}