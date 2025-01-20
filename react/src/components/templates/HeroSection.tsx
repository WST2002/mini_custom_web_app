import React from 'react';
import { motion } from 'framer-motion';
import { useImageUrl } from '@/hooks/useImageUrl';

interface HeroSectionProps {
  title: string;
  description: string;
  backgroundImage?: string;
  icon?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title, description, backgroundImage, icon }) => {
  const iconUrl = useImageUrl(icon);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-[80vh] flex items-center justify-center px-4 py-20"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
      <div className="relative flex flex-col items-center z-10 max-w-4xl mx-auto text-center text-white">
        {iconUrl && (
          <img
            src={iconUrl}
            alt={title}
            className="w-28 h-24 object-cover"
          />
        )}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
        >
          {title}
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      </div>
    </motion.section>
  );
};