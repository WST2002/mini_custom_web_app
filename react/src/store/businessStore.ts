import { create } from 'zustand';
import { BusinessData } from '../types';
import logo from './logo.png'

interface BusinessStore {
  data: BusinessData;
  selectedTemplate: number;
  updateData: (data: Partial<BusinessData>) => void;
  setTemplate: (templateId: number) => void;
}

const defaultData: BusinessData = {
  businessName: 'Your Business Name',
  logo: logo,
  phoneNumber: '+1 (555) 123-4567',
  whatsappNumber: '+15551234567',
  aboutUs: 'Welcome to our business! We strive to provide the best service to our customers.',
  photoGallery: [
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2'
  ],
  products: [
    {
      id: '1',
      title: 'Premium Product',
      desc: 'High-quality product for your needs',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      price: 99.99,
      paymentLink: ""
    }
  ],
  paymentLink: 'https://payment.example.com',
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com'
  },
  customLinks: [
    {
      title: 'Our Blog',
      url: 'https://blog.example.com'
    },
    {
      title: 'Our Blog',
      url: 'https://blog.example.com'
    },
    {
      title: 'Our Blog',
      url: 'https://blog.example.com'
    },
    {
      title: 'Our Blog',
      url: 'https://blog.example.com'
    },
    {
      title: 'Our Blog',
      url: 'https://blog.example.com'
    },
    {
      title: 'Our Blog',
      url: 'https://blog.example.com'
    }
  ]
};

export const useBusinessStore = create<BusinessStore>((set) => ({
  data: defaultData,
  selectedTemplate: 1,
  updateData: (newData) => 
    set((state) => ({ data: { ...state.data, ...newData } })),
  setTemplate: (templateId) => 
    set({ selectedTemplate: templateId })
}));