import React from 'react';
import { motion } from 'framer-motion';
import { BusinessData } from '../types';
import { Gallery } from '../components/Gallery';
import { ContactButtons } from '../components/ContactButtons';
import { SocialLinks } from '../components/SocialLinks';
import { CustomLinks } from '../components/CustomLinks';
import { HeroSection } from '../components/templates/HeroSection';
import { ProductGrid } from '../components/templates/ProductGrid';
import { QRCodeSVG } from 'qrcode.react';
import { generateUPILink } from '@/utils/upiHelpers';
import logo from '../public/logo.png';

interface Props {
  data: BusinessData;
}

export const Template4: React.FC<Props> = ({ data }) => {
  const upiLink = generateUPILink(data.paymentLink)
  const parsedLinks = Array.isArray(data.customLinks) 
  ? data.customLinks 
  : data.customLinks 
    ? JSON.parse(data.customLinks) 
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        title={data.businessName}
        description={data.aboutUs}
        backgroundImage="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
        icon={data.logo}
      />
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 px-4"
      >
        <div className="max-w-7xl text-black mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-black text-center mb-16"
          >
            Our Products
          </motion.h2>
          <ProductGrid products={data.products} />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 px-4 bg-white"
      >
        <div className="max-w-7xl text-black mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Gallery
          </motion.h2>
          {data.photoGallery.length > 0 &&
            <Gallery images={data.photoGallery} />}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 px-4 bg-indigo-900 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-16"
          >
            Connect With Us
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <SocialLinks
                links={data.socialLinks}
                className="flex justify-center gap-8"
                iconClassName="w-8 h-8"
              />
              <CustomLinks
                links={parsedLinks}
                className="flex flex-col items-center gap-4"
              />
            </div>
            <div className="flex flex-col items-center justify-center p-8 bg-white/10 rounded-2xl">
              <div className="flex flex-col items-center justify-center">
                <QRCodeSVG value={upiLink} size={200} />
                <p className="mt-4 text-gray-600">Scan to pay via UPI</p>
                <p className="mt-2 text-sm text-gray-500">UPI ID: {data.paymentLink}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <footer className="py-12 px-4 bg-indigo-950 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold"
          >
            {data.businessName}
          </motion.div>
          <SocialLinks links={data.socialLinks} />
        </div>
        <img src={logo} alt="EduCreative Logo" className="h-12 w-12" />
      </footer>

      <ContactButtons
        phoneNumber={data.phoneNumber}
        whatsappNumber={data.whatsappNumber}
      />
    </div>
  );
};