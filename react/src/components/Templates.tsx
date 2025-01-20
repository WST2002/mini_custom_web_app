import { motion } from 'framer-motion';
import { TemplateCarousel } from './templates/TemplateCarousel';

export function Templates() {
  return (
    <section id="templates" className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Start with a Template
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose from our collection of professional templates and customize them to match your brand.
          </p>
        </motion.div>

        <TemplateCarousel />
      </div>
    </section>
  );
}