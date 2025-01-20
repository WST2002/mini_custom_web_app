import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import EditPlanModal from './EditPlanModal';

type Plan = {
  id: number;
  name: string;
  price: string;
  features: string[];
  recommended: number;
};

type ManagePlansModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ManagePlansModal({ isOpen, onClose }: ManagePlansModalProps) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const fetchPlans = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("token")
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/plans`, {
        headers: {
          "access-key": `bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch plans');
      }
      const data = await response.json();
      setPlans(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load plans');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchPlans();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-8 max-w-4xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Manage Plans</h2>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <span className="ml-2 text-white">Loading plans...</span>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center py-8">
            <p>{error}</p>
            <button 
              onClick={fetchPlans}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <div className="space-y-4">
            <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Features</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {plans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 text-sm text-gray-300">{plan.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-300 capitalize">{plan.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">₹{parseFloat(plan.price).toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      <ul className="list-disc list-inside">
                        {plan.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {plan.recommended === 1 ? (
                        <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
                          Recommended
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-gray-600 text-white rounded-full">
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      <button
                        onClick={() => setEditingPlan(plan)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <EditPlanModal
        isOpen={editingPlan !== null}
        onClose={() => setEditingPlan(null)}
        plan={editingPlan}
        onUpdate={fetchPlans}
      />
    </div>
  );
}