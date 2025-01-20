import React from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Image as ImageIcon } from 'lucide-react';
import { FormProps, Product } from '../../../../types/forms';

export default function ProductForm({ formData, setFormData, onNext, onBack }: FormProps) {
  const validateProducts = () => {
    if (formData.products.length === 0) return true;
    
    return formData.products.every(product => 
      product.title.trim() !== '' &&
      product.desc.trim() !== '' &&
      product.price > 0 &&
      isValidUrl(product.paymentLink.trim()) &&
      product.imageFile instanceof File
    );
  };

  const isValidUrl = (url: string) => {
    return url.startsWith('https://') && url.length > 8;
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, {
        title: '',
        desc: '',
        image: '',
        imageFile: undefined,
        paymentLink: '',
        price: 0
      }]
    });
  };

  const removeProduct = (index: number) => {
    setFormData({
      ...formData,
      products: formData.products.filter((_, i) => i !== index)
    });
  };

  const updateProduct = (index: number, field: keyof Product, value: string | number) => {
    const newProducts = [...formData.products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setFormData({ ...formData, products: newProducts });
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newProducts = [...formData.products];
      newProducts[index] = { 
        ...newProducts[index], 
        image: file.name,
        imageFile: file 
      };
      setFormData({ ...formData, products: newProducts });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Products</h3>
          <button
            onClick={addProduct}
            className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>

        {formData.products.map((product, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4 space-y-4">
            <div className="flex justify-between">
              <h4 className="text-white font-medium">Product {index + 1}</h4>
              <button
                onClick={() => removeProduct(index)}
                className="text-red-400 hover:text-red-300"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={product.title}
                onChange={(e) => updateProduct(index, 'title', e.target.value)}
                placeholder="Product Title"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              />
              <input
                type="number"
                value={product.price}
                onChange={(e) => updateProduct(index, 'price', parseFloat(e.target.value))}
                placeholder="Price"
                min="0"
                step="0.01"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>

            <textarea
              value={product.desc}
              onChange={(e) => updateProduct(index, 'desc', e.target.value)}
              placeholder="Product Description"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white h-24"
            />

            <div className="space-y-1">
              <input
                type="url"
                value={product.paymentLink}
                onChange={(e) => updateProduct(index, 'paymentLink', e.target.value)}
                placeholder="Payment Link (https://...)"
                className={`w-full px-4 py-2 bg-white/5 border rounded-lg text-white transition-colors ${
                  product.paymentLink && !isValidUrl(product.paymentLink)
                    ? 'border-red-500/50 focus:border-red-500'
                    : 'border-white/10 focus:border-purple-500/50'
                }`}
              />
              {product.paymentLink && !isValidUrl(product.paymentLink) && (
                <p className="text-red-400 text-sm">Payment link must start with https://</p>
              )}
            </div>

            <div className="relative">
              <input
                type="file"
                id={`product-image-${index}`}
                onChange={(e) => handleImageUpload(index, e)}
                className="hidden"
                accept="image/*"
              />
              <label
                htmlFor={`product-image-${index}`}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className="w-24 h-24 border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center group-hover:border-purple-500/50 transition-colors">
                  {product.imageFile ? (
                    <img
                      src={URL.createObjectURL(product.imageFile)}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <span className="text-sm text-gray-400 group-hover:text-purple-400">
                  {product.imageFile ? 'Change Image' : 'Upload Image'}
                </span>
              </label>
            </div>
          </div>
        ))}
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
            if (validateProducts()) {
              onNext?.();
            } else {
              alert('Please fill in all product details before proceeding');
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