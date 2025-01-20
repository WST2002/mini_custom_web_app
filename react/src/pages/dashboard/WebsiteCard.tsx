import { motion } from 'framer-motion';
import { ExternalLink, Copy, Edit2, Eye, Link2 } from 'lucide-react';
import type { Website } from './types/links';
import { DeleteWebsiteButton } from './DeleteWebsiteButton';

interface WebsiteCardProps {
  website: Website;
  onCopy: (url: string) => void;
  onEdit: (website: Website) => void;
  onEditLinks: (website: Website) => void;
}

export default function WebsiteCard({ website, onCopy, onEdit, onEditLinks }: WebsiteCardProps) {
  const statusColors = {
    live: 'bg-green-500',
    draft: 'bg-yellow-500',
    archived: 'bg-gray-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{website.businessName}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`inline-block w-2 h-2 rounded-full ${statusColors[website.status]}`} />
            <span className="text-sm text-gray-400 capitalize">{website.status}</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-400">{website.createdAt}</span>
            <span className="text-sm text-gray-400">•</span>
            <div className="flex items-center gap-1 text-gray-400">
              <Eye size={14} />
              <span className="text-sm">{website.views.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => onCopy(`https://www.educreativemini.com/website/${website.params}`)}
            className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
            title="Copy Link"
          >
            <Copy size={18} />
          </button>
          <button
            onClick={() => onEdit(website)}
            className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
            title="Edit Website"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onEditLinks(website)}
            className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
            title="Edit Links"
          >
            <Link2 size={18} />
          </button>
          <DeleteWebsiteButton 
            params={website.params}
          />
          <a
            href={`/website/${website.params}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-green-400 transition-colors"
            title="Visit Website"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}