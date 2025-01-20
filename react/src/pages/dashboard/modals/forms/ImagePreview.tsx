import { X } from 'lucide-react';

interface ImagePreviewProps {
  src: string;
  onRemove?: () => void;
  className?: string;
}

export function ImagePreview({ src, onRemove, className = '' }: ImagePreviewProps) {
  return (
    <div className="relative">
      <img
        src={src}
        alt="Preview"
        className={`object-cover rounded-lg ${className}`}
      />
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute -top-2 right-0 p-1 bg-red-500 rounded-full text-white"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
