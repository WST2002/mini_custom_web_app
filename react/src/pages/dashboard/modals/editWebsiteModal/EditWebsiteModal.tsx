import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image as ImageIcon, Store, Link, Loader2 } from 'lucide-react';
import { Tabs } from './Tabs';
import { BasicInfoTab } from './tabs/BasicInfoTab';
import { GalleryTab } from './tabs/GalleryTab';
import { ProductsTab } from './tabs/ProductsTab';
import { useToast } from '../../../../hooks/useToast';
import { Toast } from '../../components/Toast';

interface EditWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  website: any;
  onWebsiteUpdated: () => void;
  plan: string;
}

export default function EditWebsiteModal({
  isOpen,
  onClose,
  website,
  onWebsiteUpdated,
  plan
}: EditWebsiteModalProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: website?.businessName || '',
    phoneNumber: website?.phoneNumber || '',
    whatsappNumber: website?.whatsappNumber || '',
    paymentLink: website?.paymentLink || '',
    photoGallery: website?.photoGallery || [],
    products: website?.products || []
  });
  const { toast, showToast, hideToast } = useToast();

  const showErrorToast = (message: string) => {
    showToast(message, 'error');
  };

  useEffect(() => {
    if (website) {
      setFormData({
        businessName: website.businessName || '',
        phoneNumber: website.phoneNumber || '',
        whatsappNumber: website.whatsappNumber || '',
        paymentLink: website.paymentLink || '',
        photoGallery: website.photoGallery || [],
        products: website.products || []
      });
    }
  }, [website]);

  const validateForm = () => {
    if (!formData.businessName.trim()) {
      showErrorToast('Business name is required');
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      showErrorToast('Phone number is required');
      return false;
    }
    if (!formData.whatsappNumber.trim()) {
      showErrorToast('WhatsApp number is required');
      return false;
    }
    if (!formData.paymentLink.trim()) {
      showErrorToast('UPI ID is required');
      return false;
    }
    // Validate phone number format (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      showErrorToast('Please enter a valid 10-digit phone number');
      return false;
    }
    // Validate WhatsApp number format (10 digits)
    if (!phoneRegex.test(formData.whatsappNumber)) {
      showErrorToast('Please enter a valid 10-digit WhatsApp number');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
      if (plan === 'free') {
        if (formData.photoGallery.length > 2 || formData.products.length > 2) {
          throw new Error('In free plan you can upload only 2 Photos and 2 Products');
        }
      } else if (plan === 'silver') {
        if (formData.photoGallery.length > 5 || formData.products.length > 5) {
          throw new Error('In silver plan you can upload only 5 Photos and 5 Products');
        }
      } else if (plan === 'gold') {
        if (formData.photoGallery.length > 10 || formData.products.length > 10) {
          throw new Error('In gold plan you can add only 10 photos and 10 products!');
        }
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/edit-mini-website`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "access-key": `bearer ${token}`
        },
        body: JSON.stringify({
          params: website.params,
          ...formData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update website');
      }

      showToast('Website updated successfully!', 'success');
      onWebsiteUpdated();
      onClose();
    } catch (error: any) {
      showErrorToast(error.message || 'Failed to update website');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Store },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'products', label: 'Products', icon: Link }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 p-4 sm:p-6 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gray-900 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-xl"
          >
            <div className="p-6 border-b border-gray-800">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Edit Website</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-6">
                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
              <div className="space-y-6">
                {activeTab === 'basic' && (
                  <BasicInfoTab
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {activeTab === 'gallery' && (
                  <GalleryTab
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {activeTab === 'products' && (
                  <ProductsTab
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-800">
              <div className="flex justify-end space-x-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[120px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
              {toast?.show && (
                <Toast
                  message={toast.message}
                  variant={'error'}
                  onClose={hideToast}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}