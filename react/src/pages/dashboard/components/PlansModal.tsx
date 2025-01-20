import { Check, X, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

type Plan = {
  id: number;
  name: string;
  price: string;
  features: string[];
  recommended: number;
};

type PlansModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: string;
  onSelectPlan: (plan: string, price: number) => void;
};

export default function PlansModal({ isOpen, onClose, currentPlan, onSelectPlan }: PlansModalProps) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem("token")
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/plans`,{
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

    if (isOpen) {
      fetchPlans();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 sm:p-6 md:p-8">
      <div className="bg-gray-900 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative">
        <div className="p-6 md:p-8 border-b border-gray-800">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold text-white mb-2">Choose Your Plan</h2>
          <p className="text-gray-400 text-xl">
            Current Plan: {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
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
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Try Again
              </button>
            </div>
          )}

          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative bg-gray-800 rounded-lg p-6 ${
                    plan.recommended ? 'border-2 border-blue-500' : ''
                  }`}
                >
                  {plan.recommended === 1 && (
                    <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                      Recommended
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-white capitalize mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-3xl font-bold text-white mb-4">
                    ₹{parseFloat(plan.price).toFixed(2)}
                    <span className="text-gray-400 text-base font-normal">/year</span>
                  </p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-300">
                        <Check className="w-5 h-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => onSelectPlan(plan.name, parseFloat(plan.price))}
                    className={`w-full py-2 rounded-lg font-semibold ${
                      currentPlan === plan.name
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                    disabled={currentPlan === plan.name}
                  >
                    {currentPlan === plan.name ? 'Current Plan' : 'Upgrade Now'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}