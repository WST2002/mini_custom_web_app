import { motion } from 'framer-motion';
import { templates } from '@/components/templates/template-data';
import { FormProps } from '../../../../types/forms';
import { useToast } from '@/hooks/useToast';
import { Toast } from '../../components/Toast';

export default function TemplateSelection({ formData, setFormData, onNext, onBack, plan }: FormProps) {
  const { toast, showToast, hideToast } = useToast();

  const showErrorToast = (message: string) => {
    showToast(message, 'error');
  };

  const isTemplateAvailable = (templateName: string, userPlan: string) => {
    if (userPlan === 'free') {
      return !['Template2', 'Template4', 'Template5', 'Template7', 'Template8', 'Template9', 'Template10'].includes(templateName);
    } else if (userPlan === 'silver') {
      return !['Template4', 'Template9', 'Template10'].includes(templateName);
    }
    return true;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        <span>You can preview templates from Home page!</span>
        {templates.map((template) => {
          const isAvailable = isTemplateAvailable(template.template, plan);
          
          return (
            <div
              key={template.template}
              onClick={() => {
                if (!isAvailable) {
                  showErrorToast("You can't use this template in your current plan!");
                  return;
                }
                setFormData({ ...formData, template: template.template });
              }}
              className={`cursor-pointer rounded-lg p-4 border transition-all ${
                !isAvailable 
                  ? 'border-red-500/50 bg-red-500/10 opacity-60 hover:border-red-500/50' 
                  : formData.template === template.template
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex gap-4 items-start">
                <div className="w-32 relative flex-shrink-0">
                  <img
                    src={template.image}
                    alt={template.title}
                    className={`rounded-lg w-full h-auto object-cover aspect-[3/4] ${!isAvailable ? 'opacity-50' : ''}`}
                  />
                  {formData.template === template.template && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  {!isAvailable && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-red-500 rounded-md text-xs text-white">
                      Upgrade Required
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2">{template.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{template.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs text-purple-300">
                      {template.category}
                    </span>
                    {!isAvailable && (
                      <span className="inline-block px-3 py-1 bg-red-500/20 rounded-full text-xs text-red-300">
                        {plan === 'free' ? 'Premium' : 'Gold Plan'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={onBack}
          className="flex-1 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!formData.template}
          className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      {toast?.show && (
        <Toast
          message={toast.message}
          variant={'error'}
          onClose={hideToast}
        />
      )}
    </motion.div>
  );
}
