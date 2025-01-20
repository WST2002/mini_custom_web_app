import { Upload, Plus } from 'lucide-react';

interface UploadButtonProps {
  id: string;
  multiple?: boolean;
  isGallery?: boolean;
}

export function UploadButton({ id, multiple, isGallery }: UploadButtonProps) {
  return (
    <label
      htmlFor={id}
      className="flex items-center justify-center w-full border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-purple-500/50 transition-colors"
      style={{ height: isGallery ? '6rem' : '8rem' }}
    >
      {isGallery ? (
        <div className="text-center">
          <Plus className="mx-auto h-8 w-8 text-gray-400" />
          <span className="mt-2 block text-sm text-gray-400">
            {multiple ? 'Add More Photos' : 'Add Photo'}
          </span>
        </div>
      ) : (
        <div className="text-center">
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          <span className="mt-2 block text-sm text-gray-400">Upload Logo</span>
        </div>
      )}
    </label>
  );
}