import { useImageUrl } from '../../hooks/useImageUrl';

interface ImagePreviewProps {
  image: string;
  alt: string;
  className?: string;
}

export function ImagePreview({ image, alt, className }: ImagePreviewProps) {
  const imageUrl = useImageUrl(image);
  
  if (!imageUrl) {
    return null;
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
    />
  );
}