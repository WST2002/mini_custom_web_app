import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import BasicInfoForm from './forms/BasicInfoForm';
import TemplateSelection from './forms/TemplateSelection';
import MediaUploadForm from './forms/MediaUploadForm';
import ProductForm from './forms/ProductForm';
import ContactInfoForm from './forms/ContactInfoForm';
//@ts-ignore
import LinksForm from './forms/LinksForm';
import LoadingSpinner from '../../common/LoadingSpinner';
import { CreateWebsiteModalProps, WebsiteFormData } from '../../../types/forms';
import { prepareFormData } from '../../../utils/formDataHelpers';
import { useToast } from '@/hooks/useToast';
import { Toast } from '../components/Toast';

export default function CreateWebsiteModal({ isOpen, onClose, userId, plan, onWebsiteCreated }: CreateWebsiteModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const showErrorToast = (message: string) => {
    showToast(message, 'error');
  };
  const [formData, setFormData] = useState<WebsiteFormData>({
    userId,
    businessName: '',
    about: '',
    template: '',
    phoneNumber: '',
    whatsapp: '',
    contactNumber: '',
    whatsappNumber: '',
    aboutUs: '',
    paymentLink: '',
    socialLinks: {},
    customLinks: [],
    logo: null,
    photoGallery: [],
    products: []
  });

  const resetForm = () => {
    setFormData({
      userId,
      businessName: '',
      about: '',
      template: '',
      phoneNumber: '',
      whatsapp: '',
      contactNumber: '',
      whatsappNumber: '',
      aboutUs: '',
      paymentLink: '',
      socialLinks: {},
      customLinks: [],
      logo: null,
      photoGallery: [],
      products: [],
    });
    setStep(1);
    onClose();
  };

  const handleSubmit = async () => {
    if (!formData.businessName || !formData.about) {
      alert('Business name and about are required');
      return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      showErrorToast('Please enter a valid 10-digit phone number');
      return false;
    }
    if (!phoneRegex.test(formData.whatsappNumber)) {
      showErrorToast('Please enter a valid 10-digit WhatsApp number');
      return false;
    }
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    try {
      if (plan == 'free') {
        if (formData.photoGallery.length > 2 || formData.products.length > 2) {
          showErrorToast('In free plan you can upload only 2 Photos and 2 Products')
        } else {
          const data = await prepareFormData(formData);
          console.log(data)
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/create-mini-website`, {
            method: 'POST',
            body: data,
            headers: {"access-key": `bearer ${token}`}
          });

          if (!response.ok) {
            throw new Error('Failed to create website');
          }

          const result = await response.json();
          console.log('Website created:', result);

          if (onWebsiteCreated) {
            onWebsiteCreated();
          }
          resetForm();
          onClose();
        }
      } else if (plan == 'silver') {
        if (formData.photoGallery.length > 5 || formData.products.length > 5) {
          showErrorToast('In silver plan you can upload only 5 Photos and 5 Products')
        } else {
          const data = await prepareFormData(formData);
          console.log(data)
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/create-mini-website`, {
            method: 'POST',
            body: data,
            headers: {"access-key": `bearer ${token}`}
          });

          if (!response.ok) {
            throw new Error('Failed to create website');
          }

          const result = await response.json();
          console.log('Website created:', result);

          if (onWebsiteCreated) {
            onWebsiteCreated();
          }
          resetForm();
          onClose();
        }
      }  else if (plan == 'gold') {
        if (formData.photoGallery.length > 10 || formData.products.length > 10) {
          showErrorToast('In gold plan you can add only 10 photos and 10 products!')
        } else{
          const data = await prepareFormData(formData);
          console.log(data)
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/create-mini-website`, {
            method: 'POST',
            body: data,
            headers: {"access-key": `bearer ${token}`}
          });

          if (!response.ok) {
            throw new Error('Failed to create website');
          }

          const result = await response.json();
          console.log('Website created:', result);

          if (onWebsiteCreated) {
            onWebsiteCreated();
          }
          resetForm();
          onClose();
        }
      } else {
        const data = await prepareFormData(formData);
          console.log(data)
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/create-mini-website`, {
            method: 'POST',
            body: data,
            headers: {"access-key": `bearer ${token}`}
          });

          if (!response.ok) {
            throw new Error('Failed to create website');
          }

          const result = await response.json();
          console.log('Website created:', result);

          if (onWebsiteCreated) {
            onWebsiteCreated();
          }
          resetForm();
          onClose();
      }

    } catch (error) {
      console.error('Error creating website:', error);
      alert('Failed to create website. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 "
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Create New Website</h2>
                  <h2 className="text-lg font-light text-white">Logo can't be edited later, so it can't be blank. Keep it under 300KB</h2>
                  <p className="text-gray-400 text-sm">Step {step} of 6</p>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[calc(80vh-12rem)] custom-scrollbar">
                {isSubmitting ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-white">Creating your website...</p>
                  </div>
                ) : (
                  <>
                    {step === 1 && <BasicInfoForm formData={formData} setFormData={setFormData} onNext={() => setStep(2)} plan={plan} />}
                    {step === 2 && <TemplateSelection formData={formData} setFormData={setFormData} onNext={() => setStep(3)} onBack={() => setStep(1)} plan={plan} />}
                    {step === 3 && <MediaUploadForm formData={formData} setFormData={setFormData} onNext={() => setStep(4)} onBack={() => setStep(2)} plan={plan} />}
                    {step === 4 && <ProductForm formData={formData} setFormData={setFormData} onNext={() => setStep(5)} onBack={() => setStep(3)} plan={plan} />}
                    {step === 5 && <ContactInfoForm formData={formData} setFormData={setFormData} onNext={() => setStep(6)} onBack={() => setStep(4)} plan={plan} />}
                    {step === 6 && <LinksForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} onBack={() => setStep(5)} plan={plan} />}
                  </>
                )}
              </div>
            </div>
          </motion.div>
          {toast?.show && (
            <Toast
              message={toast.message}
              variant={'error'}
              onClose={hideToast}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}