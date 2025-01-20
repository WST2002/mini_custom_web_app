// import { motion } from 'framer-motion';
// import { Phone, MessageCircle } from 'lucide-react';
// import { FormProps } from '../../../../types/forms';

// export default function ContactInfoForm({ formData, setFormData, onNext, onBack }: FormProps) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -20 }}
//       className="space-y-6"
//     >
//       <div>
//         <label className="block text-white mb-2">Phone Number</label>
//         <div className="relative">
//           <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//           <input
//             type="number"
//             value={formData.phoneNumber}
//             onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
//             className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
//             placeholder="Enter phone number"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-white mb-2">WhatsApp Number</label>
//         <div className="relative">
//           <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//           <input
//             type="number"
//             value={formData.whatsappNumber}
//             onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
//             className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
//             placeholder="Enter WhatsApp number"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-white mb-2">About Us</label>
//         <textarea
//           value={formData.aboutUs}
//           onChange={(e) => setFormData({ ...formData, aboutUs: e.target.value })}
//           className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white h-32"
//           placeholder="Tell us about your business..."
//         />
//       </div>

//       <div className="flex gap-4">
//         <button
//           onClick={onBack}
//           className="flex-1 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
//         >
//           Back
//         </button>
//         <button
//           onClick={onNext}
//           className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg"
//         >
//           Next
//         </button>
//       </div>
//     </motion.div>
//   );
// }



import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface FormProps {
  formData: {
    phoneNumber: string;
    whatsappNumber: string;
    aboutUs: string;
    [key: string]: any;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ContactInfoForm({ formData, setFormData, onNext, onBack }: FormProps) {
  const [errors, setErrors] = useState({
    phoneNumber: '',
    whatsappNumber: '',
    aboutUs: ''
  });

  const validateForm = () => {
    const newErrors = {
      phoneNumber: '',
      whatsappNumber: '',
      aboutUs: ''
    };
    let isValid = true;

    const phoneRegex = /^[0-9]{10}$/;
    
    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }

    if (!phoneRegex.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = 'Please enter a valid 10-digit WhatsApp number';
      isValid = false;
    }

    if (!formData.aboutUs.trim()) {
      newErrors.aboutUs = 'About Us section is required';
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
      className="space-y-6"
    >
      <div>
        <label className="block text-white mb-2">Phone Number</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="number"
            value={formData.phoneNumber}
            onChange={(e) => {
              setFormData({ ...formData, phoneNumber: e.target.value });
              if (errors.phoneNumber) {
                setErrors({ ...errors, phoneNumber: '' });
              }
            }}
            className={`w-full pl-10 pr-4 py-2 bg-white/5 border ${errors.phoneNumber ? 'border-red-500' : 'border-white/10'} rounded-lg text-white`}
            placeholder="Enter phone number"
          />
        </div>
        {errors.phoneNumber && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm mt-1"
          >
            {errors.phoneNumber}
          </motion.p>
        )}
      </div>

      <div>
        <label className="block text-white mb-2">WhatsApp Number</label>
        <div className="relative">
          <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="number"
            value={formData.whatsappNumber}
            onChange={(e) => {
              setFormData({ ...formData, whatsappNumber: e.target.value });
              if (errors.whatsappNumber) {
                setErrors({ ...errors, whatsappNumber: '' });
              }
            }}
            className={`w-full pl-10 pr-4 py-2 bg-white/5 border ${errors.whatsappNumber ? 'border-red-500' : 'border-white/10'} rounded-lg text-white`}
            placeholder="Enter WhatsApp number"
          />
        </div>
        {errors.whatsappNumber && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm mt-1"
          >
            {errors.whatsappNumber}
          </motion.p>
        )}
      </div>

      <div>
        <label className="block text-white mb-2">About Us</label>
        <textarea
          value={formData.aboutUs}
          onChange={(e) => {
            setFormData({ ...formData, aboutUs: e.target.value });
            if (errors.aboutUs) {
              setErrors({ ...errors, aboutUs: '' });
            }
          }}
          className={`w-full px-4 py-2 bg-white/5 border ${errors.aboutUs ? 'border-red-500' : 'border-white/10'} rounded-lg text-white h-32`}
          placeholder="Tell us about your business..."
        />
        {errors.aboutUs && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm mt-1"
          >
            {errors.aboutUs}
          </motion.p>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
        >
          Back
        </button>
        <button
          onClick={() => {
            if (validateForm()) {
              onNext();
            }
          }}
          className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}