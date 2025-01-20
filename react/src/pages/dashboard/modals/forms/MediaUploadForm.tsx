import React from 'react';
import { motion } from 'framer-motion';
import { FormProps } from '../../../../types/forms';
import { compressImage } from '@/utils/imageCompression';
import { ImagePreview } from './ImagePreview';
import { UploadButton } from './UploadButton';

export default function MediaUploadForm({ formData, setFormData, onNext, onBack }: FormProps) {
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressedFile = await compressImage(file, 800, 0.8);
      setFormData({ ...formData, logo: compressedFile });
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const compressedFiles = await Promise.all(
      files.map(file => compressImage(file, 1024, 0.8))
    );
    setFormData({ ...formData, photoGallery: [...formData.photoGallery, ...compressedFiles] });
  };

  const removeGalleryImage = (index: number) => {
    setFormData({
      ...formData,
      photoGallery: formData.photoGallery.filter((_, i) => i !== index),
    });
  };

  const removeLogo = () => {
    setFormData({ ...formData, logo: null });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-white mb-2">Logo</label>
        <div className="relative">
          <input
            type="file"
            onChange={handleLogoUpload}
            accept="image/*"
            className="hidden"
            id="logo-upload"
          />
          {formData.logo ? (
            <ImagePreview
              src={URL.createObjectURL(formData.logo)}
              onRemove={removeLogo}
              className="h-32 w-32"
            />
          ) : (
            <UploadButton id="logo-upload" />
          )}
        </div>
      </div>

      <div>
        <label className="block text-white mb-2">Photo Gallery</label>
        <div className="grid grid-cols-3 gap-4">
          {formData.photoGallery.map((file, index) => (
            <ImagePreview
              key={index}
              src={URL.createObjectURL(file)}
              onRemove={() => removeGalleryImage(index)}
              className="h-24 w-full"
            />
          ))}
          <input
            type="file"
            id="gallery-upload"
            multiple
            accept="image/*"
            onChange={handleGalleryUpload}
            className="hidden"
          />
          <UploadButton id="gallery-upload" multiple isGallery />
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
          onClick={onNext}
          className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}


