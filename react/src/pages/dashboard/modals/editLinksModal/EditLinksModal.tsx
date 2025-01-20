import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { useToast } from '../../../../hooks/useToast';
import { Toast } from '../../components/Toast';
import { SocialLinksSection } from './SocialLinksSection';
import { CustomLinksSection } from './CustomLinksSection';
import { SocialLinks, CustomLink, Website } from '../../types/links';
import { parseSocialLinks, parseCustomLinks, DEFAULT_SOCIAL_LINKS } from './linkParsers';

interface EditLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
  website: Website | null;
  onWebsiteUpdated: () => void;
}

export default function EditLinksModal({
  isOpen,
  onClose,
  website,
  onWebsiteUpdated
}: EditLinksModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(DEFAULT_SOCIAL_LINKS);
  const [customLinks, setCustomLinks] = useState<CustomLink[]>([]);
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    if (website) {
      setSocialLinks(parseSocialLinks(website.socialLinks));
      setCustomLinks(parseCustomLinks(website.customLinks));
    }
  }, [website]);

  const showErrorToast = (message: string) => {
    showToast(message, 'error');
  };

  const validateLinks = () => {
    for (const [platform, url] of Object.entries(socialLinks)) {
      if (url && !isValidUrl(url)) {
        showErrorToast(`Invalid ${platform} URL`);
        return false;
      }
    }

    for (const link of customLinks) {
      if (link.title.trim() && !link.url.trim()) {
        showErrorToast('All links must have a URL');
        return false;
      }
      if (!link.title.trim() && link.url.trim()) {
        showErrorToast('All links must have a title');
        return false;
      }
      if (link.url && !isValidUrl(link.url)) {
        showErrorToast(`Invalid URL for "${link.title}"`);
        return false;
      }
    }
    return true;
  };

  const isValidUrl = (url: string) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateLinks()) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/update-mini-website-links/${website?.params}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "access-key": `bearer ${token}`
        },
        body: JSON.stringify({
          params: website?.params,
          socialLinks: JSON.stringify(socialLinks),
          customLinks: JSON.stringify(customLinks.filter(link => link.title.trim() && link.url.trim()))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update links');
      }

      showToast('Links updated successfully!', 'success');
      onWebsiteUpdated();
      onClose();
    } catch (error: any) {
      showErrorToast(error.message || 'Failed to update links');
    } finally {
      setIsLoading(false);
    }
  };

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
            className="bg-gray-900 rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-xl"
          >
            <div className="p-6 border-b border-gray-800">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Edit Links</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
              <div className="space-y-8">
                <SocialLinksSection
                  socialLinks={socialLinks}
                  onChange={setSocialLinks}
                />
                <CustomLinksSection
                  customLinks={customLinks}
                  onChange={setCustomLinks}
                />
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
                  variant={toast.variant}
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