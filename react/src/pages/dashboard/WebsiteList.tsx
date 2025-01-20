import { motion } from 'framer-motion';
import WebsiteCard from './WebsiteCard';
import type { Website } from './types/links';

interface WebsiteListProps {
  websites: Website[];
  onCopy: (url: string) => void;
  onEdit: (website: any) => void;
  onEditLinks: (website: Website) => void;
}

export default function WebsiteList({ websites, onCopy, onEdit, onEditLinks }: WebsiteListProps) {
  if (websites.length == 0) {
    return <h2 className="text-lg font-light mb-6">You haven't made any websites yet 😒 </h2>
  }
  return (
    <div className="space-y-4">
      {websites.map((website, index) => (
        <motion.div
          key={website.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <WebsiteCard
            website={website}
            onCopy={onCopy}
            onEdit={onEdit}
            onEditLinks={onEditLinks}
          />
        </motion.div>
      ))}
    </div>
  );
}