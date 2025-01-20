import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useBusinessStore } from '../store/businessStore';
import { templates } from '../templates';

export const TemplateSelector = () => {
  const navigate = useNavigate();
  const setTemplate = useBusinessStore((state) => state.setTemplate);

  const handleTemplateSelect = (templateId: number) => {
    setTemplate(templateId);
    navigate('/preview');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Choose Your Business Template
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Select from our collection of modern, elegant templates
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
              onClick={() => handleTemplateSelect(template.id)}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {template.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};