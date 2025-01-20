import React from 'react';
import { Upload, X } from 'lucide-react';
import { compressAndConvertToBase64 } from '../../../../../utils/imageUtils';
import { ImagePreview } from '../../../../common/ImagePreview';

interface GalleryTabProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function GalleryTab({ formData, setFormData }: GalleryTabProps) {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = await Promise.all(
      files.map(async (file) => {
        try {
          return await compressAndConvertToBase64(file);
        } catch (error) {
          console.error('Error processing image:', error);
          return null;
        }
      })
    );

    const validImages = newImages.filter((img): img is string => img !== null);
    setFormData({
      ...formData,
      photoGallery: [...formData.photoGallery, ...validImages]
    });
  };

  const removeImage = (index: number) => {
    const newGallery = [...formData.photoGallery];
    newGallery.splice(index, 1);
    setFormData({ ...formData, photoGallery: newGallery });
  };

  return (
    <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-3 gap-4">
        {formData.photoGallery.map((image: string, index: number) => (
          <div key={index} className="relative group">
            <ImagePreview
              image={image}
              alt={`Gallery ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}
        <div className="relative">
          <label className="block w-full h-48 rounded-lg border-2 border-dashed border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-400">Add photos</span>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>
        </div>
      </div>
    </div>
  );
}