import { useState, useEffect } from 'react';
import { isValidUrl, isImageDataUrl, isBlobUrl } from '../utils/urlHelpers';
import { isBuffer, bufferToDataUrl } from '../utils/imageHelpers';

export const useImageUrl = (imageData?: unknown) => {
  const [url, setUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!imageData) return;

    // Handle Buffer data
    if (isBuffer(imageData)) {
      setUrl(bufferToDataUrl(imageData));
      return;
    }

    // Handle valid URLs and data URLs directly
    if (isValidUrl(imageData) || isImageDataUrl(imageData)) {
      setUrl(String(imageData));
      return;
    }

    // Handle blob URL
    if (typeof imageData === 'string') {
      const fetchImage = async () => {
        try {
          const response = await fetch(imageData);
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          setUrl(objectUrl);
        } catch (error) {
          console.error('Error loading image:', error);
        }
      };

      fetchImage();

      return () => {
        if (url && isBlobUrl(url)) {
          URL.revokeObjectURL(url);
        }
      };
    }
  }, [imageData]);

  return url;
};