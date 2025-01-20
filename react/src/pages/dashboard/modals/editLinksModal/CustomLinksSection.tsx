import { Plus, Trash2, Link } from 'lucide-react';
import { CustomLink } from '../../types/links';

interface CustomLinksSectionProps {
  customLinks: CustomLink[];
  onChange: (links: CustomLink[]) => void;
}

export function CustomLinksSection({ customLinks, onChange }: CustomLinksSectionProps) {
  const handleAdd = () => {
    onChange([...customLinks, { title: '', url: '' }]);
  };

  const handleRemove = (index: number) => {
    onChange(customLinks.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof CustomLink, value: string) => {
    onChange(
      customLinks.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      )
    );
  };

  const isValidUrl = (url: string) => {
    return url.startsWith('https://') && url.length > 8;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-white">
        <Link className="w-4 h-4" />
        <h3 className="font-medium">Custom Links</h3>
      </div>

      {customLinks.map((link, index) => (
        <div key={index} className="space-y-4 bg-gray-800/50 p-4 rounded-lg">
          <div className="flex justify-end">
            <button
              onClick={() => handleRemove(index)}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <input
            type="text"
            value={link.title}
            onChange={(e) => handleChange(index, 'title', e.target.value)}
            placeholder="Link Title"
            className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
          />
          <input
            type="url"
            value={link.url}
            onChange={(e) => handleChange(index, 'url', e.target.value)}
            placeholder="Custom Links (https://...)"
            className={`w-full px-4 py-2 bg-white/5 border rounded-lg text-white transition-colors ${link.url && !isValidUrl(link.url)
              ? 'border-red-500/50 focus:border-red-500'
              : 'border-white/10 focus:border-purple-500/50'
              }`}
          />
          {link.url && !isValidUrl(link.url) && (
            <p className="text-red-400 text-sm">Link must start with https://</p>
          )}
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="w-full py-3 border-2 border-dashed border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Custom Link
      </button>
    </div>
  );
}