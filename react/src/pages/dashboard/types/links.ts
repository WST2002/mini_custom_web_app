export interface SocialLinks {
    facebook: string;
    linkedin: string;
    instagram: string;
    twitter: string;
  }
  
  export interface CustomLink {
    title: string;
    url: string;
  }
  
  export interface Website {
    id: number;
    businessName: string;
    params: string;
    socialLinks: string;
    customLinks: string;
    status: 'draft' | 'live' | 'archived';
    views: number;
    createdAt: string;
  }