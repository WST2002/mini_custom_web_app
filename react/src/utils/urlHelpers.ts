import { Website } from '@/pages/dashboard/types/website';

export const generateUrlParam = async (businessName: string): Promise<string> => {
  try {
    // Fetch existing websites
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/mini-websites`);
    const websites: Website[] = await response.json();
    
    // Convert business name to URL-friendly format
    let baseParam = businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with dash
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
    
    // Check if the base param exists
    const existingParams = websites.map(w => w.params);
    let finalParam = baseParam;
    let counter = 1;
    
    while (existingParams.includes(finalParam)) {
      finalParam = `${baseParam}-${counter}`;
      counter++;
    }
    
    return finalParam;
  } catch (error) {
    console.error('Error generating URL parameter:', error);
    // Fallback to timestamp if API fails
    return `${businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`;
  }
};


//Website
export const isValidUrl = (url: unknown): url is string => {
  if (typeof url !== 'string') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isImageDataUrl = (url: unknown): url is string => {
  return typeof url === 'string' && url.startsWith('data:image/');
};

export const isBlobUrl = (url: unknown): url is string => {
  return typeof url === 'string' && url.startsWith('blob:');
};