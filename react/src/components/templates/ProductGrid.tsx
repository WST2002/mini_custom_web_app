import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import { useImageUrl } from '@/hooks/useImageUrl';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {products.map((product, index) => {
        const imageUrl = useImageUrl(product.image);
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="aspect-square overflow-hidden">
              {imageUrl && (
                <motion.img
                  src={imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4">{product.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-indigo-600">₹{product.price}</span>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={product.paymentLink}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Buy Now
                </motion.a>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};