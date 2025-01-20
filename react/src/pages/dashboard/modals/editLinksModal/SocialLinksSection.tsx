import { Link } from 'lucide-react';
import { SocialLinks } from '../../types/links';

interface SocialLinksSectionProps {
  socialLinks: SocialLinks;
  onChange: (links: SocialLinks) => void;
}

export function SocialLinksSection({ socialLinks, onChange }: SocialLinksSectionProps) {
  const handleChange = (platform: keyof SocialLinks, value: string) => {
    onChange({ ...socialLinks, [platform]: value });
  };
  const isValidUrl = (url: string) => {
    return url.startsWith('https://') && url.length > 8;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-white">
        <Link className="w-4 h-4" />
        <h3 className="font-medium">Social Media Links</h3>
      </div>
      
      {(Object.keys(socialLinks) as Array<keyof SocialLinks>).map((platform) => (
        <div key={platform} className="space-y-2">
          <label className="block text-sm text-gray-400 capitalize">
            {platform}
          </label>
          <input
            type="url"
            value={socialLinks[platform]}
            onChange={(e) => handleChange(platform, e.target.value)}
            placeholder={"Must start with https://"}
            className={`w-full px-4 py-2 bg-white/5 border rounded-lg text-white transition-colors ${socialLinks[platform] && !isValidUrl(socialLinks[platform])
              ? 'border-red-500/50 focus:border-red-500'
              : 'border-white/10 focus:border-purple-500/50'
              }`}
          />
          {socialLinks[platform] && !isValidUrl(socialLinks[platform]) && (
            <p className="text-red-400 text-sm">Link must start with https://</p>
          )}
        </div>
      ))}
    </div>
  );
}