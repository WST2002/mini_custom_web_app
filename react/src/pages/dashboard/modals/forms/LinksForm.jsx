import { motion } from 'framer-motion';
import { Link, Plus, X } from 'lucide-react';

const isValidHttpsUrl = (url) => {
  if (!url) return true; // Empty URLs are considered valid
  return url.toLowerCase().startsWith('https://');
};

export default function LinksForm({ formData, setFormData, onSubmit, onBack }) {
  const addCustomLink = () => {
    setFormData({
      ...formData,
      customLinks: [...(formData.customLinks || []), { title: '', url: '' }],
    });
  };

  const removeCustomLink = (index) => {
    setFormData({
      ...formData,
      customLinks: (formData.customLinks || []).filter((_, i) => i !== index),
    });
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData({
      ...formData,
      socialLinks: { 
        ...(formData.socialLinks || {}), 
        [platform]: value 
      },
      socialLinksErrors: {
        ...(formData.socialLinksErrors || {}),
        [platform]: value && !isValidHttpsUrl(value) ? 'URL must start with https://' : ''
      }
    });
  };

  const handleCustomLinkChange = (index, field, value) => {
    const newLinks = [...(formData.customLinks || [])];
    newLinks[index] = { ...newLinks[index], [field]: value };
    
    const newErrors = [...(formData.customLinksErrors || [])];
    if (field === 'url') {
      newErrors[index] = value && !isValidHttpsUrl(value) ? 'URL must start with https://' : '';
    }

    setFormData({ 
      ...formData, 
      customLinks: newLinks,
      customLinksErrors: newErrors
    });
  };

  const isFormValid = () => {
    // Check social links
    const hasSocialLinkErrors = Object.values(formData.socialLinks || {}).some(
      url => !isValidHttpsUrl(url)
    );
    
    // Check custom links
    const hasCustomLinkErrors = (formData.customLinks || []).some(
      link => !isValidHttpsUrl(link.url)
    );

    return !hasSocialLinkErrors && !hasCustomLinkErrors;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 w-[96%]"
    >
      <div>
        <label className="block text-white mb-2">UPI ID</label>
        <div className="relative">
          <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={formData.paymentLink || ''}
            onChange={(e) => setFormData({ ...formData, paymentLink: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
            placeholder="Enter your UPI ID to receive payments"
          />
        </div>
      </div>

      <div>
        <label className="block text-white mb-2">Social Links</label>
        <div className="space-y-4">
          {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform) => (
            <div key={platform} className="relative">
              <input
                type="url"
                value={formData.socialLinks?.[platform || '']}
                onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                className={`w-full pl-4 pr-4 py-2 bg-white/5 border ${
                  formData.socialLinksErrors?.[platform] 
                    ? 'border-red-500' 
                    : 'border-white/10'
                } rounded-lg text-white`}
                placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
              />
              {formData.socialLinksErrors?.[platform] && (
                <p className="text-red-500 text-sm mt-1">{formData.socialLinksErrors[platform]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-white">Custom Links</label>
          <button
            onClick={addCustomLink}
            className="flex items-center gap-1 text-purple-400 hover:text-purple-300"
          >
            <Plus size={16} />
            Add Link
          </button>
        </div>
        <div className="space-y-4">
          {(formData.customLinks || []).map((link, index) => (
            <div key={index} className="relative flex gap-2">
              <input
                type="text"
                value={link.title}
                onChange={(e) => handleCustomLinkChange(index, 'title', e.target.value)}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                placeholder="Link Title"
              />
              <div className="flex-1 flex flex-col">
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => handleCustomLinkChange(index, 'url', e.target.value)}
                  className={`w-full px-4 py-2 bg-white/5 border ${
                    formData.customLinksErrors?.[index]
                      ? 'border-red-500'
                      : 'border-white/10'
                  } rounded-lg text-white`}
                  placeholder="URL"
                />
                {formData.customLinksErrors?.[index] && (
                  <p className="text-red-500 text-sm mt-1">{formData.customLinksErrors[index]}</p>
                )}
              </div>
              <button
                onClick={() => removeCustomLink(index)}
                className="p-2 text-red-400 hover:text-red-300"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg disabled:opacity-50"
          disabled={!isFormValid()}
        >
          Create Website
        </button>
      </div>
    </motion.div>
  );
}

