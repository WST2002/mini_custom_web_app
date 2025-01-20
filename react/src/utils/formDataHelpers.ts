import { WebsiteFormData } from '../types/forms';
import { generateUrlParam } from './urlHelpers';

export const prepareFormData = async (formData: WebsiteFormData): Promise<FormData> => {
  const data = new FormData();
  
  // Generate URL parameter from business name
  const params = await generateUrlParam(formData.businessName);
  
  // Basic fields with null fallback
  const basicFields = {
    userId: formData.userId || '',
    businessName: formData.businessName || '',
    about: formData.about || '',
    phoneNumber: formData.phoneNumber || '',
    whatsapp: formData.whatsapp || '',
    contactNumber: formData.contactNumber || '',
    whatsappNumber: formData.whatsappNumber || '',
    aboutUs: formData.aboutUs || '',
    paymentLink: formData.paymentLink || '',
    template: formData.template || '',
    params, // Add generated params
    gallery: '[]',
    socialLinks: JSON.stringify(formData.socialLinks || {}),
    customLinks: JSON.stringify(formData.customLinks || [])
  };

  // Append basic fields
  Object.entries(basicFields).forEach(([key, value]) => {
    data.append(key, value);
  });

  // Rest of the function remains the same...
  if (formData.logo) {
    data.append('logo', formData.logo);
  }

  formData.photoGallery.forEach((file) => {
    data.append('photoGallery', file);
  });

  if (formData.products.length > 0) {
    const productsData = formData.products.map(({ imageFile, ...product }) => ({
      ...product,
      image: imageFile?.name || '',
      price: product.price || 0,
      title: product.title || '',
      desc: product.desc || '',
      paymentLink: product.paymentLink || ''
    }));
    
    data.append('products', JSON.stringify(productsData));

    formData.products.forEach(product => {
      if (product.imageFile) {
        data.append('products', product.imageFile);
      }
    });
  } else {
    data.append('products', '[]');
  }

  return data;
};