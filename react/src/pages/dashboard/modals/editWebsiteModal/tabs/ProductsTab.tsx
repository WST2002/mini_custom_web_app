import React, { useState } from 'react';
import { Plus, X, Upload } from 'lucide-react';
import { compressAndConvertToBase64 } from '../../../../../utils/imageUtils';
import { ImagePreview } from '../../../../common/ImagePreview';

interface Product {
  title: string;
  price: string;
  desc: string;
  image: string | null;
  paymentLink: string;
}

interface ProductError {
  title?: string;
  price?: string;
  desc?: string;
  image?: string;
  paymentLink?: string;
}

interface ProductsTabProps {
  formData: {
    products: Product[];
  };
  setFormData: (data: any) => void;
}

export function ProductsTab({ formData, setFormData }: ProductsTabProps) {
  const [errors, setErrors] = useState<ProductError[]>([]);

  const validateProduct = (product: Product, index: number): boolean => {
    const productErrors: ProductError = {};
    let isValid = true;

    if (!product.title.trim()) {
      productErrors.title = 'Product name is required';
      isValid = false;
    } else if (product.title.length > 100) {
      productErrors.title = 'Product name must be less than 100 characters';
      isValid = false;
    }

    if (!product.price) {
      productErrors.price = 'Price is required';
      isValid = false;
    } else {
      const priceNum = parseFloat(product.price);
      if (isNaN(priceNum) || priceNum <= 0) {
        productErrors.price = 'Price must be a positive number';
        isValid = false;
      }
    }

    if (!product.desc.trim()) {
      productErrors.desc = 'Description is required';
      isValid = false;
    } else if (product.desc.length > 500) {
      productErrors.desc = 'Description must be less than 500 characters';
      isValid = false;
    }

    if (!product.paymentLink.trim()) {
      productErrors.paymentLink = 'Payment link is required';
      isValid = false;
    } else if (!isValidURL(product.paymentLink)) {
      productErrors.paymentLink = 'Please enter a valid HTTPS URL';
      isValid = false;
    }

    if (!product.image) {
      productErrors.image = 'Product image is required';
      isValid = false;
    }

    const newErrors = [...errors];
    newErrors[index] = productErrors;
    setErrors(newErrors);

    return isValid;
  };

  const isValidURL = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [
        ...formData.products,
        { title: '', price: '', desc: '', image: null, paymentLink: '' }
      ]
    });
    setErrors([...errors, {}]);
  };

  const removeProduct = (index: number) => {
    const newProducts = [...formData.products];
    newProducts.splice(index, 1);
    const newErrors = [...errors];
    newErrors.splice(index, 1);
    setFormData({ ...formData, products: newProducts });
    setErrors(newErrors);
  };

  const updateProduct = (index: number, field: string, value: string) => {
    const newProducts = [...formData.products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setFormData({ ...formData, products: newProducts });
    
    // Clear error for the updated field
    const newErrors = [...errors];
    if (newErrors[index]) {
      newErrors[index] = { ...newErrors[index], [field]: undefined };
      setErrors(newErrors);
    }

    // Validate the updated product
    validateProduct(newProducts[index], index);
  };

  const handleProductImage = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        const newErrors = [...errors];
        newErrors[index] = { ...newErrors[index], image: 'Image size must be less than 5MB' };
        setErrors(newErrors);
        return;
      }

      try {
        const base64 = await compressAndConvertToBase64(file);
        const newProducts = [...formData.products];
        newProducts[index] = { ...newProducts[index], image: base64 };
        setFormData({ ...formData, products: newProducts });
        
        const newErrors = [...errors];
        if (newErrors[index]) {
          newErrors[index] = { ...newErrors[index], image: undefined };
          setErrors(newErrors);
        }
      } catch (error) {
        console.error('Error processing product image:', error);
        const newErrors = [...errors];
        newErrors[index] = { ...newErrors[index], image: 'Failed to process image' };
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
      {formData.products.map((product: Product, index: number) => (
        <div key={index} className="p-4 bg-gray-800 rounded-lg relative">
          <button
            onClick={() => removeProduct(index)}
            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="grid grid-cols-[120px,1fr] gap-4 overflow-y-auto">
            <div className="relative group">
              <label className="block w-full h-32 rounded-lg overflow-hidden bg-gray-700 cursor-pointer">
                {product.image ? (
                  <ImagePreview
                    image={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleProductImage(index, e)}
                  className="hidden"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-sm">Change image</p>
                </div>
              </label>
              {errors[index]?.image && (
                <p className="text-red-500 text-xs mt-1">{errors[index].image}</p>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={product.title}
                  onChange={(e) => updateProduct(index, 'title', e.target.value)}
                  placeholder="Product name"
                  className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors[index]?.title ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                {errors[index]?.title && (
                  <p className="text-red-500 text-xs mt-1">{errors[index].title}</p>
                )}
              </div>

              <div className="flex space-x-4">
                <div className="w-1/3">
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) => updateProduct(index, 'price', e.target.value)}
                    placeholder="Price"
                    className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors[index]?.price ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  {errors[index]?.price && (
                    <p className="text-red-500 text-xs mt-1">{errors[index].price}</p>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={product.desc}
                    onChange={(e) => updateProduct(index, 'desc', e.target.value)}
                    placeholder="Description"
                    className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors[index]?.desc ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  {errors[index]?.desc && (
                    <p className="text-red-500 text-xs mt-1">{errors[index].desc}</p>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={product.paymentLink}
                    onChange={(e) => updateProduct(index, 'paymentLink', e.target.value)}
                    placeholder="Payment Link (https://...)"
                    className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors[index]?.paymentLink ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  {errors[index]?.paymentLink && (
                    <p className="text-red-500 text-xs mt-1">{errors[index].paymentLink}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addProduct}
        className="w-full py-3 border-2 border-dashed border-gray-700 rounded-lg text-gray-400 hover:text-gray-300 hover:border-gray-600 transition-colors flex items-center justify-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>Add Product</span>
      </button>
    </div>
  );
}