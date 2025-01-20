import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import { useImageUrl } from '@/hooks/useImageUrl';

interface CenteredProductGridProps {
  products: Product[];
}

export const CenteredProductGrid: React.FC<CenteredProductGridProps> = ({ products }) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {products.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100 
            }}
            viewport={{ once: true }}
            className="bg-white rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <div className="relative aspect-square overflow-hidden">
              <motion.img
                src={useImageUrl(product.image)}
                alt={product.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{product.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-emerald-600">₹{product.price}</span>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={product.paymentLink}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  Buy Now
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};