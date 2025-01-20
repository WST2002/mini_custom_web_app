import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

interface SocialLinksProps {
  links: any;
  className?: string;
  iconClassName?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  links,
  className = "flex gap-6",
  iconClassName = "w-6 h-6"
}) => {

  const parsedLinks = typeof links == 'object'
    ? links
    : links
      ? JSON.parse(links)
      : [];

  console.log(typeof links)
  const socialIcons = [
    { Icon: Facebook, url: parsedLinks.facebook },
    { Icon: Instagram, url: parsedLinks.instagram },
    { Icon: Twitter, url: parsedLinks.twitter },
    { Icon: Linkedin, url: parsedLinks.linkedin }
  ];
  return (
    <div className={className}>
      {socialIcons.map(({ Icon, url }, index) => (
        <motion.a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="text-current hover:text-current/80 transition-colors"
        >
          <Icon className={iconClassName} />
        </motion.a>
      ))}
    </div>
  );
};