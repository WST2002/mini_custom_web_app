// Common form data interface
export interface WebsiteFormData {
  userId: string;
  businessName: string;
  about: string;
  template: string;
  phoneNumber: string;
  whatsapp: string;
  contactNumber: string;
  whatsappNumber: string;
  aboutUs: string;
  paymentLink: string;
  socialLinks: SocialLinks;
  customLinks: CustomLink[];
  logo: File | null;
  photoGallery: File[];
  products: Product[];
  
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

export interface CustomLink {
  title: string;
  url: string;
}

export interface Product {
  title: string;
  desc: string;
  image: string;
  imageFile?: File;
  paymentLink: string;
  price: number;
}

// Form component props
export interface FormProps {
  formData: WebsiteFormData;
  setFormData: (data: WebsiteFormData) => void;
  onNext?: () => void;
  onBack?: () => void;
  onSubmit?: () => void;
  plan: string;
}

// Modal props
export interface CreateWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  plan: string;
  onWebsiteCreated: () => void;
}