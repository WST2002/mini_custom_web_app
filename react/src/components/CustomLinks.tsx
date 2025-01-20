import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { CustomLink } from '../types';

interface CustomLinksProps {
  links?: CustomLink[] | null;
  className?: string;
}

export const CustomLinks: React.FC<CustomLinksProps> = ({
  links = [],
  className = "flex flex-wrap gap-4"
}) => {
  if (!Array.isArray(links) || links.length === 0) return null;
  // console.log(links)

  return (
    <div className={className}>
      {links.map((link, index) => {

        return (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{link.title}</span>
          </motion.a>
        );
      })}
    </div>
  );
};