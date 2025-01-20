// import { motion } from 'framer-motion';
// import { FormProps } from '../../../../types/forms';

// export default function BasicInfoForm({ formData, setFormData, onNext }: FormProps) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -20 }}
//       className="space-y-4"
//     >
//       <div>
//         <label className="block text-white mb-2">Business Name</label>
//         <input
//           type="text"
//           value={formData.businessName}
//           onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
//           className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
//         />
//       </div>
//       <div>
//         <label className="block text-white mb-2">About</label>
//         <textarea
//           value={formData.about}
//           onChange={(e) => setFormData({ ...formData, about: e.target.value })}
//           className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white h-32"
//         />
//       </div>
//       <button
//         onClick={onNext}
//         className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg"
//       >
//         Next
//       </button>
//     </motion.div>
//   );
// }



import { motion } from 'framer-motion';
import { useState } from 'react';

interface FormProps {
  formData: {
    businessName: string;
    about: string;
    [key: string]: any;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
}

export default function BasicInfoForm({ formData, setFormData, onNext }: FormProps) {
  const [errors, setErrors] = useState({
    businessName: '',
    about: ''
  });

  const validateForm = () => {
    const newErrors = {
      businessName: '',
      about: ''
    };
    let isValid = true;

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
      isValid = false;
    }

    if (!formData.about.trim()) {
      newErrors.about = 'About section is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div>
        <label className="block text-white mb-2">Business Name</label>
        <input
          type="text"
          value={formData.businessName}
          onChange={(e) => {
            setFormData({ ...formData, businessName: e.target.value });
            if (errors.businessName) {
              setErrors({ ...errors, businessName: '' });
            }
          }}
          className={`w-full px-4 py-2 bg-white/5 border ${errors.businessName ? 'border-red-500' : 'border-white/10'} rounded-lg text-white`}
        />
        {errors.businessName && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm mt-1"
          >
            {errors.businessName}
          </motion.p>
        )}
      </div>
      <div>
        <label className="block text-white mb-2">About</label>
        <textarea
          value={formData.about}
          onChange={(e) => {
            setFormData({ ...formData, about: e.target.value });
            if (errors.about) {
              setErrors({ ...errors, about: '' });
            }
          }}
          className={`w-full px-4 py-2 bg-white/5 border ${errors.about ? 'border-red-500' : 'border-white/10'} rounded-lg text-white h-32`}
        />
        {errors.about && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm mt-1"
          >
            {errors.about}
          </motion.p>
        )}
      </div>
      <button
        onClick={() => {
          if (validateForm()) {
            onNext();
          }
        }}
        className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg"
      >
        Next
      </button>
    </motion.div>
  );
}