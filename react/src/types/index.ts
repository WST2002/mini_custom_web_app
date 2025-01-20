export interface BusinessData {
  businessName: string;
  phoneNumber: string;
  logo?: string;
  whatsappNumber: string;
  aboutUs: string;
  photoGallery: string[];
  products: Product[];
  paymentLink: string;
  socialLinks: SocialLinks;
  customLinks?: CustomLink[];
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
}

export interface CustomLink {
  url: string;
  title: string;
}

export interface Product {
  id: string;
  title: string;
  desc: string;
  image: string;
  price: number;
  paymentLink: string;
}

export interface Template {
  id: number;
  name: string;
  thumbnail: string;
  component: React.ComponentType<{ data: BusinessData }>;
}